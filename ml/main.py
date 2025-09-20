from typing import List, Optional
import os
import time
import torch
from torch import nn
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field, constr
from transformers import AutoTokenizer, AutoModel

# --------------------
# Config (env-overridable)
# --------------------
OUT_DIR = os.getenv("OUT_DIR", "./artifacts")
MODEL_NAME = os.getenv("MODEL_NAME", "roberta-base")
MAX_LEN = int(os.getenv("MAX_LEN", 320))               # keep env-configurable; align CLI by using same env
THRESHOLD = float(os.getenv("THRESHOLD", 0.5))
MODEL_WEIGHTS = os.getenv("MODEL_WEIGHTS", "")         # optional explicit file name override
API_TITLE = os.getenv("API_TITLE", "AntiScam Inference API")
API_VERSION = os.getenv("API_VERSION", "1.0.0")

# Comma-separated candidate weights; falls back if MODEL_WEIGHTS not provided/found
CANDIDATE_WEIGHTS_ENV = os.getenv("CANDIDATE_WEIGHTS", "")
if CANDIDATE_WEIGHTS_ENV.strip():
    CANDIDATE_WEIGHTS = [x.strip() for x in CANDIDATE_WEIGHTS_ENV.split(",") if x.strip()]
else:
    CANDIDATE_WEIGHTS = [
        "scam_roberta_v1_1_link.pt",
        "scam_roberta_v2_joint.pt",
        "scam_roberta.pt",
    ]

# --------------------
# Model Definition
# --------------------
class ScamClassifier(nn.Module):
    def __init__(self, name: str, dropout: float = 0.1):
        super().__init__()
        self.backbone = AutoModel.from_pretrained(name)
        hid = self.backbone.config.hidden_size
        self.head = nn.Sequential(nn.Dropout(dropout), nn.Linear(hid, 1))

    def forward(self, input_ids, attention_mask):
        out = self.backbone(input_ids=input_ids, attention_mask=attention_mask)
        cls = out.last_hidden_state[:, 0]
        return self.head(cls).squeeze(-1)  # [B]

# --------------------
# Pydantic Schemas
# --------------------
class PredictIn(BaseModel):
    id: Optional[str] = Field(default=None, description="Optional unique id for the text")
    text: constr(min_length=1) = Field(..., description="Raw text to classify")
    threshold: Optional[float] = Field(default=None, ge=0.0, le=1.0, description="Override threshold 0-1")

class PredictBatchIn(BaseModel):
    items: List[PredictIn]

class PredictOut(BaseModel):
    id: Optional[str] = None
    probability: float
    label: str
    threshold: float
    model_version: str = Field(default=API_VERSION)
    # Extra observability fields (filled at runtime in responses)
    model_file: Optional[str] = None
    tokenizer_src: Optional[str] = None
    device: Optional[str] = None

# --------------------
# App & Globals
# --------------------
app = FastAPI(title=API_TITLE, version=API_VERSION)

# device pick (CUDA -> MPS -> CPU)
device = "cuda" if torch.cuda.is_available() else (
    "mps" if getattr(torch.backends, "mps", None) and torch.backends.mps.is_available() else "cpu"
)

tokenizer = None
model = None
MODEL_FILE = None         # basename of selected weights file
TOKENIZER_SRC = None      # "OUT_DIR" or "MODEL_NAME"
WEIGHTS_PATH = None

# --------------------
# Resource Loading
# --------------------
def _select_weights_path() -> str:
    """
    Choose weights path by priority:
    1) Explicit MODEL_WEIGHTS env if present and exists.
    2) First existing file in CANDIDATE_WEIGHTS under OUT_DIR.
    Raises if none found.
    """
    # Try explicit
    if MODEL_WEIGHTS:
        candidate = os.path.join(OUT_DIR, MODEL_WEIGHTS)
        if os.path.isfile(candidate):
            return candidate

    # Try candidates
    for fname in CANDIDATE_WEIGHTS:
        p = os.path.join(OUT_DIR, fname)
        if os.path.isfile(p):
            return p

    tried = [MODEL_WEIGHTS] if MODEL_WEIGHTS else []
    tried.extend(CANDIDATE_WEIGHTS)
    raise RuntimeError(f"No weights found in '{OUT_DIR}'. Tried: {tried}")

def load_resources():
    """Load tokenizer & model, with tokenizer fallback and weight selection."""
    global tokenizer, model, MODEL_FILE, TOKENIZER_SRC, WEIGHTS_PATH

    start = time.time()

    # Tokenizer: try OUT_DIR, fallback to MODEL_NAME
    loaded_from_out_dir = False
    try:
        tokenizer_local = AutoTokenizer.from_pretrained(OUT_DIR, use_fast=True)
        loaded_from_out_dir = True
    except Exception:
        tokenizer_local = AutoTokenizer.from_pretrained(MODEL_NAME, use_fast=True)
        loaded_from_out_dir = False

    # Weights selection
    weights_path = _select_weights_path()

    # Model
    model_local = ScamClassifier(MODEL_NAME)
    state = torch.load(weights_path, map_location="cpu")
    state_dict = state.get("model_state", state)
    model_local.load_state_dict(state_dict)
    model_local.to(device).eval()

    # Commit globals
    tokenizer = tokenizer_local
    model = model_local
    WEIGHTS_PATH = weights_path
    MODEL_FILE = os.path.basename(weights_path)
    TOKENIZER_SRC = "OUT_DIR" if loaded_from_out_dir else "MODEL_NAME"

    elapsed = int((time.time() - start) * 1000)
    print(f"[startup] Loaded tokenizer({TOKENIZER_SRC}) + model weights({MODEL_FILE}) in {elapsed} ms on {device}.")

# --------------------
# Inference helpers
# --------------------
@torch.no_grad()
def infer_one(text: str) -> float:
    """Single-example inference, returns probability in [0,1]."""
    enc = tokenizer(
        text,
        max_length=MAX_LEN,
        truncation=True,
        padding="max_length",
        return_tensors="pt"
    )
    input_ids = enc["input_ids"].to(device)
    attention_mask = enc["attention_mask"].to(device)
    logit = model(input_ids, attention_mask)  # [1]
    prob = torch.sigmoid(logit).item()
    return float(prob)

@torch.no_grad()
def infer_batch(texts: List[str]) -> List[float]:
    """Batch inference with one forward pass for throughput."""
    if not texts:
        return []
    enc = tokenizer(
        texts,
        max_length=MAX_LEN,
        truncation=True,
        padding="max_length",
        return_tensors="pt"
    )
    input_ids = enc["input_ids"].to(device)
    attention_mask = enc["attention_mask"].to(device)
    logits = model(input_ids, attention_mask)  # [B]
    probs = torch.sigmoid(logits).tolist()
    return [float(p) for p in probs]

def label_from_prob(prob: float, thr: float) -> str:
    return "scam" if prob >= thr else "ham"

# --------------------
# Startup
# --------------------
@app.on_event("startup")
def _startup():
    if not os.path.isdir(OUT_DIR):
        raise RuntimeError(f"OUT_DIR not found: {OUT_DIR}")
    load_resources()

# --------------------
# Routes
# --------------------
@app.get("/healthz")
def healthz():
    return {
        "status": "ok",
        "device": device,
        "version": API_VERSION,
        "model_file": MODEL_FILE,
        "tokenizer_src": TOKENIZER_SRC,
        "out_dir": OUT_DIR,
        "model_name": MODEL_NAME,
        "max_len": MAX_LEN,
        "threshold_default": THRESHOLD,
    }

@app.post("/predict", response_model=PredictOut)
def predict(req: PredictIn):
    thr = req.threshold if req.threshold is not None else THRESHOLD
    try:
        prob = infer_one(req.text)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Inference error: {e}")
    return PredictOut(
        id=req.id,
        probability=prob,
        label=label_from_prob(prob, thr),
        threshold=thr,
        model_version=API_VERSION,
        model_file=MODEL_FILE,
        tokenizer_src=TOKENIZER_SRC,
        device=device,
    )

@app.post("/predict_batch", response_model=List[PredictOut])
def predict_batch(req: PredictBatchIn):
    try:
        texts = [it.text for it in req.items]
        probs = infer_batch(texts)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Inference error (batch): {e}")

    outs: List[PredictOut] = []
    for it, prob in zip(req.items, probs):
        thr = it.threshold if it.threshold is not None else THRESHOLD
        outs.append(PredictOut(
            id=it.id,
            probability=prob,
            label=label_from_prob(prob, thr),
            threshold=thr,
            model_version=API_VERSION,
            model_file=MODEL_FILE,
            tokenizer_src=TOKENIZER_SRC,
            device=device,
        ))
    return outs
