from hazel import Hazel
from dotenv import load_dotenv
load_dotenv()

messages = [
    {"role": "assistant", "content": "Hi there!\nMy name is Hazel, and I'm gathering stories from UCSC students. What's your name?\nI work with Rallie, and we aim to understand and improve UCSC's systems for students. Are you comfortable with me using your stories, noting that they may not be anonymized initially? Our goal is to build a chatbot that helps students navigate challenges."},
    {"role": "user", "content": "Hi! My name is Sylvia"},
]

hazel = Hazel()

hazel_reply = hazel.get_message(messages, "SHARING")[0]

print(hazel_reply)