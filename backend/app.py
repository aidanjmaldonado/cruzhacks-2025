from fastapi import FastAPI, HTTPException, Header
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, Annotated
from motor.motor_asyncio import AsyncIOMotorClient
from bson import ObjectId
import uuid
import os

# Create app and interviews directory
# (Run separately with uvicorn app:app --reload --host 0.0.0.0 --port 8081)
app = FastAPI()
DATA_DIR = "./interviews"
os.makedirs(DATA_DIR, exist_ok=True)

# Allow requests from frontend (localhost:5173)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # or ["*"] for all
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# Questions of interest: How do we have FastAPI have sessions - so that our LLM Api has differentiation between users?

# Pydantic Payloads
class StartPayload(BaseModel):
    user_ID: str
    session_ID: str
    initial_question: str

class SubmitPayload(BaseModel):
    question: str
    answer: str

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

db = client["interviews-db"]
collection = db["interviews"]

@app.get("/interview/dog")
async def start_interview():
    return {"dog":"fluff"}

@app.get("/interview")
async def start_interview(user_auth: Annotated[Optional[str], Header(alias="User-Auth")] = None):

    # Determine if new or returning user
    if not user_auth:
        # New user: generate unique id
        user_ID = user_ID = str(uuid.uuid4())
        name = ""
    else:
        # Returning user: keep existing id
        user_ID = user_auth
        # Set existing use-name
        latest = await collection.find_one({"userID": user_ID}, sort=[("interview_number", -1)])
        if not latest:
            raise HTTPException(status_code=404, detail="Returning user ID not found.")
        name = latest["name"]
        
    # Get the amount of interviews created by User
    count = await collection.count_documents({"userID": user_ID})
    interview_num = count + 1

    # Create new interview document
    new_interview = {
        "userID": user_ID,
        "name": name,
        "interview_number": interview_num,
        "conversation": []
    }

    # Insert into MongoDB
    result = await collection.insert_one(new_interview)

    # Initial question:
    if not user_auth:
        initial_question = "Hi, I'm Hazel. What would you like for me to refer to you as?"
    else:
        initial_question = f"Hi, {name}, what would you like to talk about today?"

    # Generate unique Session ID
    session_ID = result.inserted_id

    # Return Response
    return {
        "user_ID": user_ID,
        "session_ID": str(session_ID),
        "initial_question": initial_question,
        "name": name
    }

@app.post("/interview/{session_ID}")
async def submit_answer(session_ID, payload: SubmitPayload):

    # Convert session id into valid string
    try:
        obj_id = ObjectId(session_ID)
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid session ID.")

    # Open most recent (Current) interview with this user
    latest_interview = await collection.find_one(
        {"_id": obj_id},
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
        {"_id": obj_id},
        {"$push": {"conversation": conversation_entry}}
    )

    # Get updated document to check conversation length
    updated_interview = await collection.find_one({"_id": obj_id})
    conversation = updated_interview["conversation"]
    name = updated_interview.get("name", "Unknown")

    # Generate next quesiton
    '''When Sylvia finishes Hazel
    next_question, next_state, updated_name = Hazel().get_message(
        state=("INITIAL" if name == "" else "SHARING"),
        conversation=conversation,
        name=name
    )
    
    # Update Mongo DB with Hazel information
    await collection.update_one(
        {"_id": obj_id},
        {
            "$set": {
                "name": updated_name
            }
        }
    )
    ''' 
    await collection.update_one(
        {"_id": obj_id},
        {
            "$set": {
                "name": name
            }
        }
    )
    next_question = "--Call Sylvia's LLM Here: Generate Next Question Based on Prior Convo--"

    # Return next question to client    
    # return {"next_question": next_question, "name": updated_name}
    return {"next_question": next_question, "name": "name"}

'''
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
'''
