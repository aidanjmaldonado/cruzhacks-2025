import os
from dotenv import load_dotenv
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_chroma import Chroma
from langchain_core.prompts import PromptTemplate, format_document
from langchain_core.runnables import RunnablePassthrough
from langchain_core.output_parsers import StrOutputParser



class Nut():
    def __init__(self, additionalcontext):
        # Key
        load_dotenv()
        GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
        os.environ["GOOGLE_API_KEY"] = GOOGLE_API_KEY


        embeddings = GoogleGenerativeAIEmbeddings(model="models/text-embedding-004")

        vectorstore_disk = Chroma(
            persist_directory="./chroma_vs",
            embedding_function=embeddings
        )

        retriever = vectorstore_disk.as_retriever(search_kwargs={"k": 3})

        llm = ChatGoogleGenerativeAI(model="gemini-2.0-flash")

        rag_llm_prompt_template = f"""You are an assistant for question-answering tasks.
        Use the following context to answer the question.
        If you don't know the answer, just say that you don't know.
        Use five sentences maximum and keep the answer concise. You are an assistant, consolidating the provided context
        with your own knowledge to provide students with the wisdom curated by their peers to navigate the bureaucracy of college. Help
        these curious students learn from their peers. Don't just tell me a summary of what the students are talking about, I want to you identify the key
        points of their struggles and how they overcame them. Provide reasonable, actionable steps.  \n
        Question: {{question}} \nContext: {{context}}\n{additionalcontext} \nAnswer:"""


        rag_llm_prompt = PromptTemplate.from_template(rag_llm_prompt_template)

        self.rag_chain = (
            {"context": retriever | self.format_docs, "question": RunnablePassthrough()}
            | rag_llm_prompt
            | llm
            | StrOutputParser()
        )

    def format_docs(self, docs):
        return "\n\n".join(doc.page_content for doc in docs)
    
    def prompt(self, query):
        return self.rag_chain.invoke(query)
