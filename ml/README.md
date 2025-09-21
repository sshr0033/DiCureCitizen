# AntiScam Inference API — Quick Guide


## Important before run

Please **unzip** the `models.zip` and put all `pt` files into `artifacts` folder before run

---
## Run locally

```bash 
# 1) Put model files in ./artifacts
#    - scam_roberta.pt  (or your latest weights)
#    - tokenizer files  (tokenizer.json / vocab.json / merges.txt / ...)

# 2) Install deps
python -m venv .venv && . .venv/bin/activate      # Windows: .\.venv\Scripts\activate
pip install --upgrade pip -r requirements.txt
# If no GPU:
# pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cpu

# 3) Start the API
uvicorn main:app --host 0.0.0.0 --port 8000
```

---

## How your backend calls it

### Health

```
GET /healthz
```

### Single prediction

```
POST /predict
Content-Type: application/json
{
  "id": "t1",
  "text": "Your statement is ready. Visit https://www.google.com",
  "threshold": 0.6   // optional; default comes from server config
}
```

**Response**

```json
{
  "id": "t1",
  "probability": 0.873,
  "label": "scam",
  "threshold": 0.6,
  "model_version": "1.0.0"
}
```

### Batch prediction

```
POST /predict_batch
Content-Type: application/json
{
  "items": [
    {"id": "s1", "text": "Claim your free iPhone now!"},
    {"id": "h1", "text": "Your statement is ready."}
  ],
  "threshold": 0.5   // optional
}
```

---

## Environment variables (optional)

* `OUT_DIR` — where tokenizer & weights live (default `./artifacts`)
* `MODEL_NAME` — backbone name (default `roberta-base`; must match training)
* `MODEL_WEIGHTS` — weights filename (default `scam_roberta.pt`)
* `MAX_LEN` — inference sequence length (match training, e.g., `160` or `64`)
* `THRESHOLD` — default classification threshold (default `0.5`)
* `API_TITLE`, `API_VERSION` — cosmetic

---

## Notes

* Model loads **once at startup**; requests are fast forward passes.
* To swap models later, drop new files in `OUT_DIR` and change `MODEL_WEIGHTS`; the API endpoints stay the same.
