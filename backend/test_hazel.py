from hazel import Hazel
from dotenv import load_dotenv
load_dotenv()

messages = [
    {"role": "assistant", "content": "Hello! It's nice to meet you. What's your name?"},
    {"role": "user", "content": "Hi! My name is Sylvia"},
    {"role": "assistant", "content": "Hi Sylvia! Can you tell me about a time at UC Santa Cruz where you felt very frustrated with the system?"},
    {"role": "user", "content": "Last quarter, I was trying to switch my major to Computer Science. I had all the prerequisites done, but the system kept saying I needed CSE 30, even though I had taken CS 12B which is the equivalent course from before they restructured the department. I emailed the department advisor, who told me to contact the registrar, who told me to go back to the department. I spent three weeks going back and forth between offices, each saying the other needed to handle it.\nFinally, I found out I needed to file a course substitution form, but that form needed signatures from both my current major advisor AND the CS advisor, and they both had different office hours on opposite sides of campus. By the time I got all the signatures, the deadline for major declarations had passed and I had to wait another quarter. It was super frustrating because I knew I had the requirements done, it was just the system not recognizing the old course numbers."}
]

hazel = Hazel()

hazel_reply = hazel.get_message(messages, "SHARING")[0]

print(hazel_reply)