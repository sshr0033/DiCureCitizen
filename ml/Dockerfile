FROM python:3.11-slim

ENV PIP_NO_CACHE_DIR=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends \
        git curl ca-certificates \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt ./
RUN pip install --no-cache-dir --upgrade pip \
    && pip install --no-cache-dir torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cpu \
    && pip install --no-cache-dir -r requirements.txt


COPY main.py app.py inference.py download_weights.py ./
COPY artifacts ./artifacts   

EXPOSE 8000

ENV OUT_DIR=/app/artifacts \
    MODEL_NAME=roberta-base \
    MODEL_WEIGHTS=/app/artifacts/scam_roberta.pt \
    MAX_LEN=320 \
    THRESHOLD=0.5 \
    API_TITLE="AntiScam Inference API" \
    API_VERSION="1.0.0"

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
