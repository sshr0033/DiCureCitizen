import os
import torch
from torch import nn
from transformers import AutoTokenizer, AutoModel
import warnings
import gdown   

warnings.filterwarnings("ignore")

OUT_DIR = "./artifacts"
MODEL_NAME = "roberta-base"
MAX_LEN = 160   


DRIVE_FILES = {
    "scam_roberta.pt": "1lThXKeLPK6UK4inWHZp2oKpv8CvsP__5",
    "scam_roberta_v1_1_link.pt": "1xNA-yD3lmYPKElBgb8rjv6P9TMWYQH91",
    "scam_roberta_v1_1_add.pt": "1lBtVjfosycEIYhJG7q6oNnzvIDdNeG_o",
    "scam_roberta_v2_joint.pt": "1muQ5gUJouf1sZMvD4OVM7Rz5cC_Q_IMV",


}

os.makedirs(OUT_DIR, exist_ok=True)


for fname, fid in DRIVE_FILES.items():
    out_path = os.path.join(OUT_DIR, fname)
    if not os.path.isfile(out_path):
        url = f"https://drive.google.com/uc?id={fid}"
        print(f"Downloading {fname}...")
        gdown.download(url, out_path, quiet=False)
    else:
        print(f"{fname} already exists.")

CANDIDATE_WEIGHTS = [
    "scam_roberta_v1_1_link.pt",
    "scam_roberta.pt",
    "scam_roberta_v1_1_add.pt",
    "scam_roberta_v2_joint.pt",
]

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

try:
    tokenizer = AutoTokenizer.from_pretrained(OUT_DIR, use_fast=True)
except Exception:
    tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME, use_fast=True)


weight_path = None
for fname in CANDIDATE_WEIGHTS:
    p = os.path.join(OUT_DIR, fname)
    if os.path.isfile(p):
        weight_path = p; break
if weight_path is None:
    raise FileNotFoundError(f"No weights found in {OUT_DIR}. Tried: {CANDIDATE_WEIGHTS}")

print(f"Using weights: {weight_path}")

model = ScamClassifier(MODEL_NAME)
state = torch.load(weight_path, map_location="cpu")
state_dict = state.get("model_state", state)
model.load_state_dict(state_dict)
model.to(device).eval()

@torch.no_grad()
def predict_proba(text: str) -> float:
    enc = tokenizer(text, max_length=MAX_LEN, truncation=True, padding="max_length", return_tensors="pt")
    input_ids = enc["input_ids"].to(device)
    attention_mask = enc["attention_mask"].to(device)
    logit = model(input_ids, attention_mask)
    return float(torch.sigmoid(logit).item())

if __name__ == "__main__":
    user_input = input("Please Enter the Message: ")
    print("Scam probability:", predict_proba(user_input))
