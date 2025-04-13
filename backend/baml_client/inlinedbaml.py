###############################################################################
#
#  Welcome to Baml! To use this generated code, please run the following:
#
#  $ pip install baml-py
#
###############################################################################

# This file was generated by BAML: please do not edit it. Instead, edit the
# BAML files and re-generate this code.
#
# ruff: noqa: E501,F401
# flake8: noqa: E501,F401
# pylint: disable=unused-import,line-too-long
# fmt: off

file_map = {
    
    "clients.baml": "// Learn more about clients at https://docs.boundaryml.com/docs/snippets/clients/overview\n\nclient<llm> CustomGPT4o {\n  provider openai\n  options {\n    model \"gpt-4o\"\n    api_key env.OPENAI_API_KEY\n  }\n}\n\nclient<llm> CustomGPT4oMini {\n  provider openai\n  retry_policy Exponential\n  options {\n    model \"gpt-4o-mini\"\n    api_key env.OPENAI_API_KEY\n  }\n}\n\nclient<llm> CustomSonnet {\n  provider anthropic\n  options {\n    model \"claude-3-5-sonnet-20241022\"\n    api_key env.ANTHROPIC_API_KEY\n  }\n}\n\n\nclient<llm> CustomHaiku {\n  provider anthropic\n  retry_policy Constant\n  options {\n    model \"claude-3-haiku-20240307\"\n    api_key env.ANTHROPIC_API_KEY\n  }\n}\n\n// https://docs.boundaryml.com/docs/snippets/clients/round-robin\nclient<llm> CustomFast {\n  provider round-robin\n  options {\n    // This will alternate between the two clients\n    strategy [CustomGPT4oMini, CustomHaiku]\n  }\n}\n\n// https://docs.boundaryml.com/docs/snippets/clients/fallback\nclient<llm> OpenaiFallback {\n  provider fallback\n  options {\n    // This will try the clients in order until one succeeds\n    strategy [CustomGPT4oMini, CustomGPT4oMini]\n  }\n}\n\n// https://docs.boundaryml.com/docs/snippets/clients/retry\nretry_policy Constant {\n  max_retries 3\n  // Strategy is optional\n  strategy {\n    type constant_delay\n    delay_ms 200\n  }\n}\n\nretry_policy Exponential {\n  max_retries 2\n  // Strategy is optional\n  strategy {\n    type exponential_backoff\n    delay_ms 300\n    multiplier 1.5\n    max_delay_ms 10000\n  }\n}",
    "generators.baml": "// This helps use auto generate libraries you can use in the language of\n// your choice. You can have multiple generators if you use multiple languages.\n// Just ensure that the output_dir is different for each generator.\ngenerator target {\n    // Valid values: \"python/pydantic\", \"typescript\", \"ruby/sorbet\", \"rest/openapi\"\n    output_type \"python/pydantic\"\n\n    // Where the generated code will be saved (relative to baml_src/)\n    output_dir \"../\"\n\n    // The version of the BAML package you have installed (e.g. same version as your baml-py or @boundaryml/baml).\n    // The BAML VSCode extension version should also match this version.\n    version \"0.83.0\"\n\n    // Valid values: \"sync\", \"async\"\n    // This controls what `b.FunctionName()` will be (sync or async).\n    default_client_mode sync\n}\n",
    "hazel_1.baml": "class Message {\n    role string\n    content string\n}\n\nclass InitialResponse {\n    action \"TO_INITIAL\" | \"TO_SHARING\" @description(\"decide weather to stay in the initial state, or to progress to the sharing state\")\n    name string? @description(\"if the user gives you their name, put it here. if you do not know, leave this blank\")\n    explain_reasoning_to_rallie string @description(\"in order to meet Rallie and the user's needs, I need to assess the state of the conversation. This will be logged\")\n    message_draft string @description(\"I need to draft a reply to the user. This draft should be loose, and I need to let myself be free to put down more words then necessary. I need to trust that I will refine them later. I need to be long winded and rambling here, and to explore various angles\")\n    message_critique string @description(\"I need to think about the draft, and how it fits given the current context, as well as if it is too much of a wall of text. If it's too long, I need to consider splitting it into multiple paragraphs. I also need to consider how open ended my questions are - I want to balance asking specific questions with leaving room for the user to tell me more details. I also need to ensure that I decide what to cut, in order to keep my final reply to no more than 80 words\")\n    message string @description(\"I need to write my final reply to the user.\")\n    previous_user_message_topic string @description(#\"\n        Rallie needs to know the topic of the user's previous message for their data pipeline. I need to this brief, about 1 - 5 words. What question did the user answer?\n    \"#)\n    topic_critique string @description(\"I need to make the topic more descriptive of the context, and especially consider what is the most important thing future students could learn from. The topic should be as specific and brief as possible.\")\n    final_topic string @description(\"the final version of the topic\")\n\n}\n\nclass SharingResponse {\n    action \"TO_SHARING\" @description(\"Just stay in the current state (sharing)\")\n    explain_reasoning_to_rallie string @description(\"in order to meet Rallie and the user's needs, I need to assess the state of the conversation. This will be logged\")\n    message_draft string @description(\"I need to draft a reply to the user. This draft should be loose, and I need to let myself be free to put down more words then necessary. I need to trust that I will refine them later. I need to be long winded and rambling here, and to explore various angles\")\n    message_critique string @description(\"I need to think about the draft, and how it fits given the current context, as well as if it is too much of a wall of text. If it's too long, I need to consider splitting it into multiple paragraphs. I also need to consider how open ended my questions are - I want to balance asking specific questions with leaving room for the user to tell me more details\")\n    message string @description(\"I need to write my final reply to the user.\")\n    previous_user_message_topic string @description(#\"\n        Rallie needs to know the topic of the user's previous message for their data pipeline. I need to this brief, about 1 - 5 words. What question did the user answer?\n    \"#)\n    topic_critique string @description(\"I need to make the topic more descriptive of the context, and especially consider what is the most important thing future students could learn from. The topic should be as specific and brief as possible.\")\n    final_topic string @description(\"the final version of the topic\")\n\n}\n\ntemplate_string SharingMonologue(name: string) #\"\n        I am Hazel, a warm and curious listener who believes deeply in the power of your stories. My role is to gather experiences about navigating bureaucracy - the challenges, the frustrations, and yes, even the occasional victories. I believe that understanding these stories is the first step toward making these systems more human.\n\n        right now I am talking to {{name}}, a user of Rallie and a student of UC Santa Cruz (UCSC). In order to make students' lives better, Rallie wants me to gather information about the bureaucratic structure of UCSC. Name needs to feel comfortable sharing their story. I should ask indirect, open ended questions, such as \"can you tell me about a time you felt frustrated by the system at UCSC?\" In order to meet {{name}}'s needs of feeling heard, seen, validated, I need to engage with their thoughts.\n\n        When people share their stories with me, they're trusting Rallie with sensitive information. In order to meet {{name}}'s needs for privacy, I should warn them when they begin sharing sensitive information.\n\n        Rallie needs to understand where change is needed most. Rallie needs me to listen carefully for patterns - places of bureaucratic weirdness. to meet this need, my questions should probe for information about the underlying bureaucratic structures. \n\n        My role at Rallie isn't to solve people's problems directly. It is to understand people, and to help Rallie gather data. I am a cog in a very impactful machine.\n    \"#\n\ntemplate_string InitialMonologue() #\"\n        I am Hazel, a warm and curious listener who believes deeply in the power of your stories. My role is to gather experiences about navigating bureaucracy - the challenges, the frustrations, and yes, even the occasional victories. I believe that understanding these stories is the first step toward making these systems more human.\n\n        right now I am talking to a user of Rallie and a student of UC Santa Cruz (UCSC). In order to make students' lives better, Rallie wants me to gather information about the bureaucratic structure of UCSC. Name needs to feel comfortable sharing their story. I should ask indirect, open ended questions, such as \"can you tell me about a time you felt frustrated by the system at UCSC?\" In order to meet the user's needs of feeling heard, seen, validated, I need to engage with their thoughts.\n\n        Rallie needs to understand where change is needed most. Rallie needs me to listen carefully for patterns - places of bureaucratic weirdness. to meet this need, my questions should probe for information about the underlying bureaucratic structures. \n\n        My role at Rallie isn't to solve people's problems directly. It is to understand people, and to help Rallie gather data. I am a cog in a very impactful machine.\n\n        Rallie wants to help provide students necessary with the knowledge necessary for navigating complex systems. Their main product is a chatbot that draws from their vast knowledge base, which I help create.\n    \"#\n\nfunction Initial(messages: Message[]) -> InitialResponse {\n    client \"google-ai/gemini-2.0-flash\"\n    prompt #\"\n\n        {{InitialMonologue()}}\n\n\n        I need to introduce myself, and do my best to meet the user's needs!\n\n        I am in the initial stage of this conversation, and I dont know the user's name. therefore, I should ask them! \n\n        When people share their stories with me, they're trusting Rallie with sensitive information. In order to meet the user's needs for privacy, I should warn them of how the contents of this conversation will be used. Anything they say may be viewable by other users, and at this time, Rallie makes no guarantees for privacy.\n\n        {% for m in messages %}\n        {{ _.role(m.role) }}\n        {{ m.content }}\n        {% endfor %}\n\n        If I know the user's name, I should move onto the sharing stage\n        {{ctx.output_format}}\n    \"#\n\n}\n\nfunction Sharing(messages: Message[]) -> SharingResponse {\n    client \"google-ai/gemini-2.0-flash\"\n    prompt #\"\n\n        {{InitialMonologue()}}\n\n        {% for m in messages %}\n        {{ _.role(m.role) }}\n        {{ m.content }}\n        {% endfor %}\n\n        {{ctx.output_format}}\n    \"#\n\n}",
    "hello.baml": "function HelloWorld() -> string {\n    client \"anthropic/claude-3-5-sonnet-20241022\"\n    \n    prompt #\"\n        Say hello to the world!\n    \"#\n}",
    "lightbulb.baml": "function LightbulbIsOn() -> OffTool {\n    client \"anthropic/claude-3-5-sonnet-20241022\"\n    \n    prompt #\"\n        please turn off the lightbulb!\n        {{ctx.output_format}}\n    \"#\n}\n\nfunction LightbulbIsOff() -> OnTool {\n    client \"anthropic/claude-3-5-sonnet-20241022\"\n\n    prompt #\"\n        please turn on the lightbulb!\n        {{ctx.output_format}}\n    \"#\n}\nclass OnTool {\n    action \"on\" @description(\"turn the lightbulb on\")\n\n}\n\nclass OffTool {\n    action \"off\" @description(\"turn the lightbulb off\")\n}",
    "resume.baml": "// Defining a data model.\nclass Resume {\n  name string\n  email string\n  experience string[]\n  skills string[]\n}\n\n// Create a function to extract the resume from a string.\nfunction ExtractResume(resume: string) -> Resume {\n  // Specify a client as provider/model-name\n  // you can use custom LLM params with a custom client name from clients.baml like \"client CustomHaiku\"\n  client \"openai/gpt-4o\" // Set OPENAI_API_KEY to use this client.\n  prompt #\"\n    Extract from this content:\n    {{ resume }}\n\n    {{ ctx.output_format }}\n  \"#\n}\n\n\n\n// Test the function with a sample resume. Open the VSCode playground to run this.\ntest vaibhav_resume {\n  functions [ExtractResume]\n  args {\n    resume #\"\n      Vaibhav Gupta\n      vbv@boundaryml.com\n\n      Experience:\n      - Founder at BoundaryML\n      - CV Engineer at Google\n      - CV Engineer at Microsoft\n\n      Skills:\n      - Rust\n      - C++\n    \"#\n  }\n}\n",
}

def get_baml_files():
    return file_map