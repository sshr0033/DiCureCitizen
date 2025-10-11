import os
import torch
from torch import nn
from fastapi import FastAPI
from pydantic import BaseModel
from transformers import AutoTokenizer, AutoModel
import uvicorn
from download_weights import local_path 

# Model configuration
OUT_DIR = "./artifacts"
MODEL_NAME = "roberta-base"
MAX_LEN = 160

# Define model architecture
class ScamClassifier(nn.Module):
    """Binary classifier based on RoBERTa encoder."""
    def __init__(self, name: str, dropout: float = 0.1):
        super().__init__()
        self.backbone = AutoModel.from_pretrained(name)
        hid = self.backbone.config.hidden_size
        self.head = nn.Sequential(nn.Dropout(dropout), nn.Linear(hid, 1))

    def forward(self, input_ids, attention_mask):
        """Forward pass returning one scalar logit."""
        out = self.backbone(input_ids=input_ids, attention_mask=attention_mask)
        cls = out.last_hidden_state[:, 0]
        return self.head(cls).squeeze(-1)

# Load tokenizer and model
device = "cuda" if torch.cuda.is_available() else "cpu"

try:
    tokenizer = AutoTokenizer.from_pretrained(OUT_DIR, use_fast=True)
    print(f"[startup] Tokenizer loaded from local folder: {OUT_DIR}")
except Exception:
    tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME, use_fast=True)
    print(f"[startup] Tokenizer loaded from HuggingFace hub: {MODEL_NAME}")

model = ScamClassifier(MODEL_NAME)
weights_path = local_path
state = torch.load(weights_path, map_location="cpu")
state_dict = state.get("model_state", state)
model.load_state_dict(state_dict)
model.to(device).eval()

# FastAPI app definition
app = FastAPI(
    title="AntiScam Simple API",
    docs_url=None,     # Disable Swagger UI (/docs)
    redoc_url=None,    # Disable ReDoc (/redoc)
)

# Request and response schemas
class TextIn(BaseModel):
    text: str

class ProbabilityOut(BaseModel):
    probability: float

# Prediction logic
@torch.no_grad()
def predict_proba(text: str) -> float:
    """Tokenize input and return scam probability."""
    enc = tokenizer(text, max_length=MAX_LEN, truncation=True, padding="max_length", return_tensors="pt")
    input_ids = enc["input_ids"].to(device)
    attention_mask = enc["attention_mask"].to(device)
    logit = model(input_ids, attention_mask)
    return float(torch.sigmoid(logit).item())

# REST endpoint
@app.post("/predict", response_model=ProbabilityOut)
def predict(req: TextIn):
    """Handle POST /predict requests."""
    prob = predict_proba(req.text)
    return {"probability": prob}

# Entry point
if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
