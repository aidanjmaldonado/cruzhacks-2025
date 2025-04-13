from baml_client.sync_client import b
from baml_client.types import Message
from dotenv import load_dotenv
from typing import Literal, Union, Tuple, Optional, List
from pydantic import BaseModel

class State(BaseModel):
    state: Literal["INITIAL", "SHARING"]

class Transition(BaseModel):
    transition: Literal["TO_INITIAL", "TO_SHARING"]


class Hazel:
    def __init__(self):
        self.state = State(state="INITIAL")
        self.transition = None
        self.last_message = None
        self.new_state = None
        self.last_topic = None
        self.username = None
    def process(self):
        print(self.state.state)
        match self.state.state:
            case "INITIAL":
                self.transition = self.state_is_initial()
            case "SHARING":
                self.transition = self.state_is_sharing()
 
        self.handle_transition()
    
    def handle_transition(self):
        if self.transition == Transition(transition="TO_INITIAL"):
            self.state = State(state="INITIAL")
        if self.transition == Transition(transition="TO_SHARING"):
            self.state = State(state="SHARING")

    def get_message(self, messages: List[Message], state: str) -> Tuple[str, State, Optional[str], str]:
        self.state = State(state=state)
        self.messages = [Message(**msg) for msg in messages]
        self.process()
        print(self.username)
        return (self.last_message, self.new_state,
                self.username if hasattr(self, 'username') else None,
                self.last_topic)

    
    def state_is_initial(self) -> State:
        # Get current messages or initialize empty list
        #LOG?
        messages = getattr(self, 'messages', [])
        # run the AI function
        response = b.Initial(self.messages)
        if response.name:
            self.name = response.name

        self.last_message: str = response.message
        self.last_topic: str = response.final_topic
        self.username = response.name


        # handle side effects - do I need to send anything to the front end?
        # no I do not - state is managed by parent!
        match response.action:
            case "TO_INITIAL":
                return Transition(transition="TO_INITIAL")
            case "TO_SHARING":
                return Transition(transition="TO_SHARING")

    
    def state_is_sharing(self):
        messages = getattr(self, 'messages', [])
    # run the AI function
        response = b.Sharing(self.messages)

        self.last_message: str = response.message
        self.last_topic: str = response.final_topic
        self.username = response.name

        return Transition(transition="TO_SHARING")