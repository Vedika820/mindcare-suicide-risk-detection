from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from transformers import AutoTokenizer, AutoModelForSequenceClassification
import torch

# Initialize FastAPI
app = FastAPI()

# Enable CORS for Chrome Extension
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load Tokenizer
tokenizer = AutoTokenizer.from_pretrained("model")

# Load BERT Model
model = AutoModelForSequenceClassification.from_pretrained("model")

# Input format
class TextInput(BaseModel):
    text: str


@app.post("/predict")
def predict_risk(data: TextInput):

    text = data.text

    # Tokenize text
    inputs = tokenizer(
        text,
        return_tensors="pt",
        truncation=True,
        padding=True,
        max_length=128
    )

    # Model prediction
    with torch.no_grad():
        outputs = model(**inputs)

    logits = outputs.logits

    probabilities = torch.softmax(logits, dim=1)

    score = probabilities[0][1].item()

    # Convert score → Risk Level
    if score > 0.7:
        risk = "High"
    elif score > 0.4:
        risk = "Medium"
    else:
        risk = "Low"

    print("Text:", text)
    print("Score:", score)
    print("Risk:", risk)

    return {
        "risk": risk,
        "score": score
    }