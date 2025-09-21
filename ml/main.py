import os
import torch
from torch import nn
from fastapi import FastAPI
from pydantic import BaseModel
from transformers import AutoTokenizer, AutoModel
import uvicorn


OUT_DIR = "./artifacts"
MODEL_NAME = "roberta-base"
MAX_LEN = 160


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

device = "cuda" if torch.cuda.is_available() else "cpu"

tokenizer = AutoTokenizer.from_pretrained(OUT_DIR, use_fast=True)
model = ScamClassifier(MODEL_NAME)
weights_path = os.path.join(OUT_DIR, "scam_roberta.pt")  # apna weight file ka naam daal
state = torch.load(weights_path, map_location="cpu")
state_dict = state.get("model_state", state)
model.load_state_dict(state_dict)
model.to(device).eval()

app = FastAPI(title="AntiScam Simple API")

class TextIn(BaseModel):
    text: str

class ProbabilityOut(BaseModel):
    probability: float

@torch.no_grad()
def predict_proba(text: str) -> float:
    enc = tokenizer(text, max_length=MAX_LEN, truncation=True, padding="max_length", return_tensors="pt")
    input_ids = enc["input_ids"].to(device)
    attention_mask = enc["attention_mask"].to(device)
    logit = model(input_ids, attention_mask)
    return float(torch.sigmoid(logit).item())

@app.post("/predict", response_model=ProbabilityOut)
def predict(req: TextIn):
    prob = predict_proba(req.text)
    return {"probability": prob}


if __name__ == "__main__":
    uvicorn.run("api:app", host="0.0.0.0", port=8000, reload=True)
