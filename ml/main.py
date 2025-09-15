from typing import List, Optional
import os
import time
import torch
from torch import nn
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field, constr
from transformers import AutoTokenizer, AutoModel

# --------------------
# Config
# --------------------
OUT_DIR = os.getenv("OUT_DIR", "./artifacts")
MODEL_NAME = os.getenv("MODEL_NAME", "roberta-base")
MAX_LEN = int(os.getenv("MAX_LEN", 320))
THRESHOLD = float(os.getenv("THRESHOLD", 0.5))
MODEL_WEIGHTS = os.getenv("MODEL_WEIGHTS", "scam_roberta.pt")
API_TITLE = os.getenv("API_TITLE", "AntiScam Inference API")
API_VERSION = os.getenv("API_VERSION", "1.0.0")

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
        return self.head(cls).squeeze(-1)

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

# --------------------
# App & Globals
# --------------------
app = FastAPI(title=API_TITLE, version=API_VERSION)

device = "cuda" if torch.cuda.is_available() else ("mps" if getattr(torch.backends, "mps", None) and torch.backends.mps.is_available() else "cpu")
tokenizer = None
model = None

def load_resources():
    global tokenizer, model
    start = time.time()
    tokenizer = AutoTokenizer.from_pretrained(OUT_DIR)
    model = ScamClassifier(MODEL_NAME)
    state = torch.load(os.path.join(OUT_DIR, MODEL_WEIGHTS), map_location="cpu")
    state_dict = state.get("model_state", state)
    model.load_state_dict(state_dict)
    model.to(device).eval()
    return time.time() - start

@torch.no_grad()
def infer_one(text: str) -> float:
    enc = tokenizer(
        text,
        max_length=MAX_LEN,
        truncation=True,
        padding="max_length",
        return_tensors="pt"
    )
    input_ids = enc["input_ids"].to(device)
    attention_mask = enc["attention_mask"].to(device)
    logit = model(input_ids, attention_mask)
    prob = torch.sigmoid(logit).item()
    return float(prob)

def label_from_prob(prob: float, thr: float) -> str:
    return "scam" if prob >= thr else "ham"

# --------------------
# Startup
# --------------------
@app.on_event("startup")
def _startup():
    if not os.path.isdir(OUT_DIR):
        raise RuntimeError(f"OUT_DIR not found: {OUT_DIR}")
    weights_path = os.path.join(OUT_DIR, MODEL_WEIGHTS)
    if not os.path.isfile(weights_path):
        raise RuntimeError(f"Model weights not found: {weights_path}")
    load_ms = int(load_resources() * 1000)
    print(f"[startup] Loaded model and tokenizer in {load_ms} ms on {device}.")

# --------------------
# Routes
# --------------------
@app.get("/healthz")
def healthz():
    return {"status": "ok", "device": device, "version": API_VERSION}

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
    )

@app.post("/predict_batch", response_model=List[PredictOut])
def predict_batch(req: PredictBatchIn):
    outs = []
    for item in req.items:
        thr = item.threshold if item.threshold is not None else THRESHOLD
        try:
            prob = infer_one(item.text)
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Inference error for item id={item.id}: {e}")
        outs.append(PredictOut(
            id=item.id,
            probability=prob,
            label=label_from_prob(prob, thr),
            threshold=thr,
        ))
    return outs
