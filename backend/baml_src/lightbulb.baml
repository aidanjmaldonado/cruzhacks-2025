function LightbulbIsOn() -> OffTool {
    client "anthropic/claude-3-5-sonnet-20241022"
    
    prompt #"
        please turn off the lightbulb!
        {{ctx.output_format}}
    "#
}

function LightbulbIsOff() -> OnTool {
    client "anthropic/claude-3-5-sonnet-20241022"

    prompt #"
        please turn on the lightbulb!
        {{ctx.output_format}}
    "#
}
class OnTool {
    action "on" @description("turn the lightbulb on")

}

class OffTool {
    action "off" @description("turn the lightbulb off")
}