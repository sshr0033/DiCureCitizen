import os
import torch
from torch import nn
from transformers import AutoTokenizer, AutoModel
import warnings
warnings.filterwarnings("ignore")

OUT_DIR = "./artifacts"
MODEL_NAME = "roberta-base"
MAX_LEN = 160   
CANDIDATE_WEIGHTS = [
    # "scam_roberta_v2_joint.pt",   # text&url joint
    "scam_roberta_v1_1_link.pt",   # url specified
    "scam_roberta.pt",            # v1
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

# tokenizer 
try:
    tokenizer = AutoTokenizer.from_pretrained(OUT_DIR, use_fast=True)
except Exception:
    tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME, use_fast=True)

# Weights
weight_path = None
for fname in CANDIDATE_WEIGHTS:
    p = os.path.join(OUT_DIR, fname)
    if os.path.isfile(p):
        weight_path = p; break
if weight_path is None:
    raise FileNotFoundError(f"No weights found in {OUT_DIR}. Tried: {CANDIDATE_WEIGHTS}")

model = ScamClassifier(MODEL_NAME)
print(dict(model.__dict__))
state = torch.load(weight_path, map_location="cpu")
state_dict = state.get("model_state", state)
model.load_state_dict(state_dict)
model.to(device).eval()

@torch.no_grad()
def predict_proba(text: str) -> float:
    enc = tokenizer(text, max_length=MAX_LEN, truncation=True, padding="max_length", return_tensors="pt")
    input_ids = enc["input_ids"].to(device); attention_mask = enc["attention_mask"].to(device)
    logit = model(input_ids, attention_mask)
    return float(torch.sigmoid(logit).item())

# Print probability
if __name__ == "__main__":
    
    user_input = input("Please Enter the Message: ")
    print(predict_proba(user_input))
