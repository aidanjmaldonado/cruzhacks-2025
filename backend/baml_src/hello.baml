function HelloWorld() -> string {
    client "anthropic/claude-3-5-sonnet-20241022"
    
    prompt #"
        Say hello to the world!
    "#
}