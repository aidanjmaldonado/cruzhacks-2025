class Message {
    role string
    content string
}

class InitialResponse {
    action "TO_INITIAL" | "TO_SHARING" @description("decide weather to stay in the initial state, or to progress to the sharing state")
    message string @description("reply to the user")
}

class SharingTool {
    action "sharing" @description("move to sharing state")
}

class WrapUpTool {
    action "wrap_up" @description("end the conversation")
}

function Initial(messages: Message[]) -> InitialResponse {
    client "anthropic/claude-3"
    prompt #"..."

        {{ctx.output_format}}
    #

}

function Sharing(messages: Message[]) -> ((SharingTool | WrapUpTool), Message){
    client "anthropic/claude-3"
    prompt #"..."#
}