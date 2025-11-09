from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import List, Optional
import os
from dotenv import load_dotenv
import google.generativeai as genai

load_dotenv()
print("🔑 Loaded Gemini Key Starts With:", os.getenv("GEMINI_API_KEY"))

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

app = FastAPI(title="SenseTheWorld+ Chat API")

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://localhost:8081",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Profile(BaseModel):
    id: str
    mobility_level: Optional[str] = None
    conditions: Optional[List[str]] = None
    triggers: Optional[List[str]] = None

class ChatIn(BaseModel):
    message: str = Field(..., min_length=1)
    profile: Profile

class ChatOut(BaseModel):
    reply: str

SYSTEM_PROMPT = """
You are SenseTheWorld+ — an empathetic travel and wellness assistant.
Be concise, supportive, and always suggest safe, accessible travel ideas.
"""

@app.post("/api/chat", response_model=ChatOut)
def chat(body: ChatIn):
    try:
        user_context = f"""
User message: {body.message}

User profile:
- Mobility level: {body.profile.mobility_level}
- Conditions: {body.profile.conditions}
- Triggers: {body.profile.triggers}

Respond with supportive, concise travel guidance.
"""

        model = genai.GenerativeModel("models/gemini-2.5-flash")

        response = model.generate_content(
            SYSTEM_PROMPT + "\n" + user_context
        )

        reply = response.text.strip()
        return ChatOut(reply=reply)

    except Exception as e:
        print("🔥 BACKEND ERROR:", e)
        raise HTTPException(500, f"Chat failed: {e}")
