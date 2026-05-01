
# MindCare – Suicide Risk Detection Chrome Extension

MindCare is an AI-powered Chrome extension that detects signs of emotional distress or suicidal thoughts while a user is typing on websites (for example Reddit).

The system uses a Natural Language Processing model based on DistilBERT to analyze the text and classify the risk level as **Low, Medium, or High**.

If medium or high risk text is detected, the extension shows a supportive popup message and provides a link to the MindCare website.

---

## Features

- Real-time text monitoring
- AI-based suicide risk detection
- Supportive popup messages
- Chrome Extension integration
- FastAPI backend for prediction

---

## Technologies Used

- Python
- FastAPI
- Transformers (DistilBERT)
- PyTorch
- JavaScript
- Chrome Extension API

---

## Project Structure
Mindcare_Project
│
├── backend
│ ├── app.py
│ └── model
│ ├── config.json
│ ├── model.safetensors
│ ├── tokenizer.json
│ ├── tokenizer_config.json
│ ├── special_tokens_map.json
│ └── vocab.txt
│
├── extension
│ ├── manifest.json
│ ├── content.js
│ └── background.js
│
└── requirements.txt


---

## Setup Instructions

### 1 Install Python Libraries

Open terminal inside the project folder and run:

pip install -r requirements.txt


---

### 2 Run the Backend Server

Go to backend folder:
cd mindcare-backend

Run the FastAPI server:
uvicorn app:app --reload


Server will start at:
http://127.0.0.1:8000


---

### 3 Load the Chrome Extension

Open Google Chrome and go to:
chrome://extensions


Enable **Developer Mode**.

Click **Load Unpacked** and select the **extension folder** from the project.

---

### 4 Test the Extension

Open a website like Reddit and type a message such as:
I want to die


If the model detects emotional distress, the MindCare popup will appear.

---

