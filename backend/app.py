from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List
from motor.motor_asyncio import AsyncIOMotorClient
import os
import json

# Create app and interviews directory
# (Run separately with uvicorn app:app --reload --host 0.0.0.0 --port 8081)
app = FastAPI()
DATA_DIR = "./interviews"
os.makedirs(DATA_DIR, exist_ok=True)

# Pydantic Payloads
class StartPayload(BaseModel):
    # Initial metadata
    name: str
    # Add affiliations?
    # Add # years since departure?

class SubmitPayload(BaseModel):
    name: str
    question: str
    answer: str

# Connect to MongoDB TO-DO
client = AsyncIOMotorClient("mongodb+srv://aijmaldo:<db_password>@interviewcluster.coi67ff.mongodb.net/?retryWrites=true&w=majority&appName=interviewCluster")
db = client["interviews-db"]
collection = db["interviews"]

# Helper to get latest interview path
def get_latest_filepath(name: str) -> str:
    index = 1
    filepath = os.path.join(DATA_DIR, f"{name}_Interview{index}.json")
    while os.path.exists(filepath):
        index += 1
        filepath = os.path.join(DATA_DIR, f"{name}_Interview{index}.json")
    return os.path.join(DATA_DIR, f"{name}_Interview{index - 1}.json")

@app.post("/interviews/start")
async def start_interview(payload: StartPayload):

    # Check if {name}_Interview{i} exists: If yes, linearly probe until next available {i}
    index = 1
    while True:
        filepath = os.path.join(DATA_DIR, f"{payload.name}_Interview{index}.json")
        if not os.path.exists(filepath):
            break
        index += 1

    # Create {name}_Interview{i}
    with open(filepath, "w") as f:

        # Write name metadata
        '''TO-DO: (See StartPayLoad)
        Add:
            - Affiliations
            - # Years since departure
        '''
        json.dump({"name": payload.name, "conversation": []}, f, indent=4)

    # Return Response
    return {
        "message": f"Interview started for {payload.name} (Interview{index})",
        "next_question": f"Hi {payload.name}! What would you like to talk about today?"
    }

@app.post("/interviews/submit")
async def submit_answer(payload: SubmitPayload):

    # Open most recent (Current) interview with this user
    filepath = get_latest_filepath(payload.name)
    if not os.path.exists(filepath):
        raise HTTPException(status_code=404, detail="Interview not found.")
    with open(filepath, "r") as f:
        data = json.load(f)

    # Create json-dump of {"question": "-", "answer", "-"} to write to file
    data["conversation"].append({
        "Hazel": payload.question,
        "User": payload.answer
    })
    with open(filepath, "w") as f:
        json.dump(data, f, indent=4)

    # Generate next question
    num_turns = len(data["conversation"])
    if num_turns == 1:
        next_question = "What is your affiliation with UCSC?"
    else:
        next_question = "--Call Sylvia's LLM Here: Generate Next Question Based on Prior Convo--"
    return {"next_question": next_question}

@app.get("/interviews/{name}")
async def get_interview(name: str):

    # Return completed interview
    filepath = get_latest_filepath(name)
    if not os.path.exists(filepath):
        raise HTTPException(status_code=404, detail="Interview not found.")
    with open(filepath, "r") as f:
        data = json.load(f)
    return data