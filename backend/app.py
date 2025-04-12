from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional
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
client = AsyncIOMotorClient("mongodb+srv://aijmaldo:7Bk3rNMQHpcMHDpF@interviewcluster.coi67ff.mongodb.net/?retryWrites=true&w=majority&appName=interviewCluster")
db = client["interviews-db"]
collection = db["interviews"]

# Helper to get latest interview path
# def get_latest_filepath(name: str) -> str:
#     index = 1
#     filepath = os.path.join(DATA_DIR, f"{name}_Interview{index}.json")
#     while os.path.exists(filepath):
#         index += 1
#         filepath = os.path.join(DATA_DIR, f"{name}_Interview{index}.json")
#     return os.path.join(DATA_DIR, f"{name}_Interview{index - 1}.json")

@app.post("/interviews/start")
async def start_interview(payload: StartPayload):

    # Get the amount of interviews created by User
    count = await collection.count_documents({"name": payload.name})
    interview_num = count + 1

    # Create new interview document
    new_interview = {
        "name": payload.name,
        "interview_number": interview_num,
        "conversation": [],
    }

    # Insert into MongoDB
    result = await collection.insert_one(new_interview)

    # Return Response
    return {
        "message": f"Interview started for {payload.name} (Interview{interview_num})",
        "interview_id": str(result.inserted_id),
        "next_question": f"Hi {payload.name}! What would you like to talk about today?"
    }

@app.post("/interviews/submit")
async def submit_answer(payload: SubmitPayload):

    # Open most recent (Current) interview with this user
    latest_interview = await collection.find_one(
        {"name": payload.name},
        sort=[("interview_number", -1)]
    )
    
    if not latest_interview:
        raise HTTPException(status_code=404, detail="Interview not found.")

    # Update MongoDB .json file with {"question": "-", "answer", "-"}
    # Add new conversation turn
    conversation_entry = {
        "Hazel": payload.question,
        "User": payload.answer,
    }
    
    # Update the document by pushing to the conversation array
    await collection.update_one(
        {"_id": latest_interview["_id"]},
        {"$push": {"conversation": conversation_entry}}
    )

    # Get updated document to check conversation length
    updated_interview = await collection.find_one({"_id": latest_interview["_id"]})
    num_turns = len(updated_interview["conversation"])

    # Generate next question
    if num_turns == 1:
        next_question = "What is your affiliation with UCSC?"
    else:
        next_question = "--Call Sylvia's LLM Here: Generate Next Question Based on Prior Convo--"
    
    return {"next_question": next_question}

@app.get("/interviews/{name}") # Not really necessary if we're not ever filtering by User
async def get_interview(name: str, interview_number: Optional[int] = None):
    # If interview number is provided, get that specific interview
    if interview_number:
        interview = await collection.find_one({
            "name": name,
            "interview_number": interview_number
        })
        if not interview:
            raise HTTPException(status_code=404, detail=f"Interview {interview_number} not found for {name}.")
        # Convert MongoDB _id to string for JSON serialization
        interview["_id"] = str(interview["_id"])
        return interview
    
    # Otherwise, get the latest interview
    latest_interview = await collection.find_one(
        {"name": name},
        sort=[("interview_number", -1)]
    )
    
    if not latest_interview:
        raise HTTPException(status_code=404, detail=f"No interviews found for {name}.")
    
    # Convert MongoDB _id to string for JSON serialization
    latest_interview["_id"] = str(latest_interview["_id"])
    return latest_interview

@app.get("/interviews/{name}/all")
async def get_all_interviews(name: str):
    # Retrieve all interviews for this user
    cursor = collection.find({"name": name}).sort("interview_number", 1)
    interviews = await cursor.to_list(length=100)  # Adjust the length based on expected maximum
    
    if not interviews:
        raise HTTPException(status_code=404, detail=f"No interviews found for {name}.")
    
    # Convert MongoDB _id to string for JSON serialization
    for interview in interviews:
        interview["_id"] = str(interview["_id"])
    
    return interviews