from nut import Nut
from fastapi import FastAPI, HTTPException, Header
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, Annotated
from motor.motor_asyncio import AsyncIOMotorClient
from bson import ObjectId
from dotenv import load_dotenv
import uuid
import os

# Create app and interviews directory
app = FastAPI()

# Allow requests from frontend (localhost:5173)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # or ["*"] for all
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class SubmitPayload(BaseModel):
    conversation: list

# Connect to MongoDB TO-DO
try:
    client = AsyncIOMotorClient(
        "mongodb+srv://aijmaldo:7Bk3rNMQHpcMHDpF@interviewcluster.coi67ff.mongodb.net/?retryWrites=true&w=majority&appName=interviewCluster",
        serverSelectionTimeoutMS=20000
    )
    # Test the connection
    client.admin.command('ping')
    print("Connected successfully to MongoDB")
except Exception as e:
    print(f"MongoDB connection error: {e}")

i_db = client["interviews-db"]
i_collection = i_db["vectors"]

@app.get("/prompt/dog")
async def start_interview():
    return {"dog":"fluff"}

@app.post("/prompt")
async def submit_answer(payload: SubmitPayload):

    # Activate key
    load_dotenv()

    # Generate next quesiton
    nut = Nut()

    # Formulate context for RAG injection
    additional_context = [entry["text"] for entry in payload["chat"] if "text" in entry]
    context = []
    context += additional_context[:-1]

    nut = Nut(context)
    answer = nut.prompt(additional_context[-1])

    # Return next question to client    
    return {"answer": answer}