from langchain_core.prompts import PromptTemplate, format_document
from langchain import hub
from langchain_core.documents import Document
from langchain_community.document_loaders import WebBaseLoader
from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables import RunnablePassthrough
from langchain_community.vectorstores import Chroma
from langchain_text_splitters import CharacterTextSplitter
from dotenv import load_dotenv
from motor.motor_asyncio import AsyncIOMotorClient
import asyncio
from bson import ObjectId
import os

# Key
load_dotenv()
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
os.environ["GOOGLE_API_KEY"] = GOOGLE_API_KEY

# Grab important keys
quality_interview_ids = [
    '67fb5cca8fe3f4e541471388',
    '67fb5eee30abd128091a89e5',
    '67fb612c8fe3f4e541471389',
    '67fb612c3856b08d811c9d7b',
    '67fb618130abd128091a89e6',
    '67fb630330abd128091a89e7',
    '67fb639b8fe3f4e54147138a',
    '67fb64523856b08d811c9d7c',
    '67fb645d8fe3f4e54147138b',
    '67fb649b3856b08d811c9d7d',
    '67fb65078fe3f4e54147138c',
    '67fb662830abd128091a89e8',
    '67fb67738fe3f4e54147138f',
    '67fb68898fe3f4e541471390',
    '67fb69323856b08d811c9d7f',
    '67fb69578fe3f4e541471391',
    '67fb6b8e3856b08d811c9d80'
]

# Grab all text from keys, names, store in:
'''
{[sentence, sentence, sentence, ...]}
format '''

async def raw_text():
    client = AsyncIOMotorClient(
        "mongodb+srv://aijmaldo:7Bk3rNMQHpcMHDpF@interviewcluster.coi67ff.mongodb.net/?retryWrites=true&w=majority&appName=interviewCluster",
        serverSelectionTimeoutMS=20000
    )
    try:
        await client.admin.command('ping')
        print("Connected successfully to MongoDB")
    except Exception as e:
        print(f"MongoDB connection error: {e}")
        return

    i_db = client["interviews-db"]
    i_collection = i_db["interviews"]
    all_user_sentences = []
    for key in quality_interview_ids:
        interview = await i_collection.find_one({"_id": ObjectId(key)})
        if interview and "conversation" in interview:
            user_sentences = [
                dictionary["User"]
                for dictionary in interview["conversation"]
                if "User" in dictionary
            ]
            all_user_sentences.extend(user_sentences)
        else:
            print(f"Not found or missing conversation: {key}")
    
    return all_user_sentences

# Extract Interview Text
sentences_to_embed = asyncio.run(raw_text())

# Import embedder
from langchain_google_genai import GoogleGenerativeAIEmbeddings
embeddings = GoogleGenerativeAIEmbeddings(model="models/text-embedding-004")

# Chroma vector store
docs_to_embed = []
for sentence in sentences_to_embed:
    docs_to_embed.append(Document(page_content=sentence, metadata={"source": "local"}))

Chroma.from_documents(docs_to_embed, embeddings)

# Store embeddings in disk
vectorstore = Chroma.from_documents(
    documents=docs_to_embed,
    embedding=embeddings,
    persist_directory="./chroma_vs"
)

vectorstore_disk = Chroma(
    persist_directory="./chroma_vs",
    embedding_function=embeddings
)
