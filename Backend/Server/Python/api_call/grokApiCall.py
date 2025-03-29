import os
from openai import OpenAI

XAI_API_KEY = os.getenv("XAI_API_KEY")
client = OpenAI(
    api_key=XAI_API_KEY,
    base_url="https://api.x.ai/v1",
)
def generate_grok_response(context, prompt):
    completion = client.chat.completions.create(
        model="grok-2-latest",
        messages=[
            {
                "role": "system",
                "content": context
            },
            {
                "role": "user",
                "content": prompt
            },
        ],
    )
    return completion.choices[0].message.content
