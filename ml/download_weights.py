import os, requests

OUT_DIR = "./artifacts"
os.makedirs(OUT_DIR, exist_ok=True)
Just hardcode the SAS URL OR load from env properly
BLOB_URL = os.getenv("MODEL_BLOB_URL", "https://mlpistorage123.blob.core.windows.net/models/scam_roberta.pt?sp=r&st=2025-09-22T00:57:07Z&se=2025-09-22T09:12:07Z&spr=https&sv=2024-11-04&sr=b&sig=FeccLqXpJmh0OOnA7jmk9L5%2FIdAwe3hqj2hBGBiHSmc%3D")  # SAS URL comes from Azure App Settings
local_path = os.path.join(OUT_DIR, "scam_roberta.pt")

if not os.path.isfile(local_path):
    print(f"[startup] Downloading model from Azure Blob Storage...")
    r = requests.get(BLOB_URL)
    r.raise_for_status()
    with open(local_path, "wb") as f:
        f.write(r.content)
    print(f"[startup] Model saved to {local_path}")
else:
    print(f"[startup] Model already exists: {local_path}")
