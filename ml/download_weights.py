import os, requests

OUT_DIR = "./artifacts"
os.makedirs(OUT_DIR, exist_ok=True)

BLOB_URL = os.getenv("MODEL_BLOB_URL")  # set this in Azure App Settings
local_path = os.path.join(OUT_DIR, "scam_roberta_v1_1_link.pt")

if not os.path.isfile(local_path):
    if not BLOB_URL:
        raise RuntimeError("MODEL_BLOB_URL is not set in environment variables")
    print(f"[startup] Downloading model from Azure Blob Storage...")
    r = requests.get(BLOB_URL)
    r.raise_for_status()
    with open(local_path, "wb") as f:
        f.write(r.content)
    print(f"[startup] Model saved to {local_path}")
else:
    print(f"[startup] Model already exists: {local_path}")

