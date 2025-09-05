from fastapi import FastAPI
from pydantic import BaseModel

try:
    from inference import predict_proba as model_predict
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
    if "http" in t or "www" in t:
        score += 2
    if any(w in t for w in ["bank", "bsb", "password"]):
        score += 2
    if any(w in t for w in ["urgent", "verify", "locked"]):
        score += 1
    return min(1.0, score / 5.0)

@app.post("/predict")
def predict(req: PredictRequest):
    p = None
    if model_predict:
        try:
            p = float(model_predict(req.text))
        except Exception:
            p = None
    if p is None:
        p = fallback_prob(req.text)
    return {"probability": p}
