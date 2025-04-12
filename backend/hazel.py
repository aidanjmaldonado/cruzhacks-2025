from baml_client.sync_client import b
from baml_client.types import Message, OnTool, OffTool
from dotenv import load_dotenv
from typing import Literal, Union, Tuple, Optional, List
from pydantic import BaseModel

class State(BaseModel):
    state: Literal["INITIAL", "SHARING"]

class Transition(BaseModel):
    state: Literal["TO_INITIAL", "TO_SHARING"]

type Message = str

class Hazel:
    def __init__(self):
        self.state = State(state="INITIAL")
        self.transition = None
        self.last_message = None
    def process(self):
        match self.state:
            case State(state="INITIAL"):
                self.transition = self.state_is_initial()
            case State(state="SHARING"):
                self.transition = self.state_is_sharing()
 
        self.handle_transition()
    
    def handle_transition(self):
        if self.transition == Transition(transition="TO_INITIAL"):
            self.state = State(state="INITIAL")
        if self.transition == Transition(transition="TO_SHARING"):
            self.state = State(state="SHARING")

def get_message(self, messages: List[str], state: str) -> Tuple[Message, State, Optional[str]]:
    self.state = State(state=state)  
    self.messages = messages
    self.process()
    return (self.last_message, self.new_state,
            self.username if hasattr(self, 'username') else None)

    
def state_is_initial(self) -> State:
    # Get current messages or initialize empty list
    #LOG?
    messages = getattr(self, 'messages', [])
    # run the AI function
    response = b.Initial(self.messages)
    self.name = response.name

    self.last_message: str = response.message
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
        response = b.Initial(self.messages)

        self.last_message: str = response.message

        return Transition(transition="TO_SHARING")