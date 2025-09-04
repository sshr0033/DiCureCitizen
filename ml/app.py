# ml/app.py
from fastapi import FastAPI
from pydantic import BaseModel

# Try to use your own inference; otherwise fall back to a simple heuristic
try:
    # change the import/name if your function is different
    from inference import predict_probability as model_predict  # e.g. def predict_probability(text, top_k) -> float
except Exception:
    model_predict = None

app = FastAPI(title="DiCureCitizen ML")

class PredictRequest(BaseModel):
    text: str | None = ""
    link: bool = False
    bank: bool = False
    top_k: int = 5

def fallback_prob(text: str) -> float:
    t = (text or "").lower()
    score = 0
    if "http" in t or "www" in t: score += 2
    if any(w in t for w in ["bank", "bsb", "password"]): score += 2
    if any(w in t for w in ["urgent", "verify", "locked"]): score += 1
    return min(1.0, score / 5.0)

@app.get("/health")
def health():
    return {"ok": True}

@app.post("/predict")
def predict(req: PredictRequest):
    p = None
    if model_predict:
        try:
            p = float(model_predict(req.text, req.top_k))
        except Exception:
            p = None
    if p is None:
        p = fallback_prob(req.text)
    return {"probability": p}
