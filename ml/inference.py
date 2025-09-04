# inference.py
import os
from pathlib import Path
import warnings

import torch
from torch import nn
from fastapi import FastAPI
from pydantic import BaseModel
from transformers import AutoTokenizer, AutoModel, RobertaConfig, RobertaModel

warnings.filterwarnings("ignore")

# ========= config =========
BASE_DIR = Path(__file__).resolve().parent
OUT_DIR = Path(os.getenv("OUT_DIR", BASE_DIR / "artifacts"))
MAX_LEN = int(os.getenv("MAX_LEN", "320"))
BACKBONE_NAME = os.getenv("BACKBONE", "roberta-base")  # your training backbone

if not OUT_DIR.exists():
    raise FileNotFoundError(
        f"Artifacts folder not found: {OUT_DIR}\n"
        f"Put tokenizer files + scam_roberta.pt here."
    )

WEIGHTS_PATH = OUT_DIR / "scam_roberta.pt"
if not WEIGHTS_PATH.exists():
    raise FileNotFoundError(f"Missing weights: {WEIGHTS_PATH}")

# ========= device =========
device = (
    "cuda" if torch.cuda.is_available()
    else "mps" if getattr(torch.backends, "mps", None) and torch.backends.mps.is_available()
    else "cpu"
)

# ========= model structure =========
class ScamClassifier(nn.Module):
    def __init__(self, backbone: nn.Module, dropout: float = 0.1):
        super().__init__()
        self.backbone = backbone
        hid = self.backbone.config.hidden_size
        self.head = nn.Sequential(nn.Dropout(dropout), nn.Linear(hid, 1))

    def forward(self, input_ids, attention_mask):
        out = self.backbone(input_ids=input_ids, attention_mask=attention_mask)
        cls = out.last_hidden_state[:, 0]
        return self.head(cls).squeeze(-1)

# ========= tokenizer (force local) =========
tokenizer = AutoTokenizer.from_pretrained(
    str(OUT_DIR),
    use_fast=True,
    local_files_only=True
)

# ========= backbone loader =========
def build_backbone():
    """
    Prefer a local/cached backbone. If not available locally, fall back to a config-only
    RobertaModel (no internet required). This matches roberta-base dimensions.
    """
    try:
        return AutoModel.from_pretrained(BACKBONE_NAME, local_files_only=True)
    except Exception:
        cfg = RobertaConfig(
            vocab_size=tokenizer.vocab_size,
            hidden_size=768,
            intermediate_size=3072,
            num_attention_heads=12,
            num_hidden_layers=12,
            pad_token_id=tokenizer.pad_token_id,
        )
        return RobertaModel(cfg)

backbone = build_backbone()
model = ScamClassifier(backbone)

# ========= load weights =========
state = torch.load(str(WEIGHTS_PATH), map_location="cpu")
if isinstance(state, dict) and "model_state" in state:
    state = state["model_state"]
missing, unexpected = model.load_state_dict(state, strict=False)
if missing or unexpected:
    print("State dict notes -> missing:", missing, "unexpected:", unexpected)

model.to(device).eval()

# ========= core predict =========
@torch.no_grad()
def predict_proba(text: str) -> float:
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
    p = torch.sigmoid(logit).item()
   
    if p < 0.0: p = 0.0
    if p > 1.0: p = 1.0
    return float(p)

# ========= FastAPI app =========
app = FastAPI(title="DiCureCitizen Inference")

class PredictIn(BaseModel):
    text: str

class PredictOut(BaseModel):
    probability: float  # 0..1

@app.get("/health")
def health():
    return {"ok": True, "device": device, "max_len": MAX_LEN}

@app.post("/predict", response_model=PredictOut)
def predict(inp: PredictIn):
    return PredictOut(probability=predict_proba(inp.text))

# ========= CLI test =========
if __name__ == "__main__":
    spam_example = "Congratulations! You have won a $1,000 Walmart gift card. Please click http://bit.ly/fakeclaim to claim your prize now."
    ham_example  = "Your Chase credit card statement is now available."
    print("Scam probability (spam):", predict_proba(spam_example))
    print("Scam probability (ham): ", predict_proba(ham_example))
   