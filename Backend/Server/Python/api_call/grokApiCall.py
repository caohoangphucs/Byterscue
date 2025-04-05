import os
from openai import OpenAI

XAI_API_KEY = "xai-FJzmC3Lu7r425PHtvG89M4RSVS8EuTCg8RbsshLDIbK8d7GVCopp1vP2vmIgkfdUla35mb8mgoS3Etqq"
client = OpenAI(
    api_key=XAI_API_KEY,
    base_url="https://api.x.ai/v1",
)
def generate_grok_response(context, prompt, base64_image=None):
    messages = [
        {"role": "system", "content": context},
        {"role": "user", "content": [{"type": "text", "text": prompt}]}
    ]

    # Chỉ thêm ảnh nếu base64_image không rỗng
    if base64_image:
        messages[1]["content"].append({
            "type": "image_url",
            "image_url": {"url": f"data:image/jpeg;base64,{base64_image}", "detail": "low"}
        })

    completion = client.chat.completions.create(
        model="grok-2-vision",
        messages=messages
    )

    print(completion.usage.prompt_tokens_details)
    return completion.choices[0].message.content
