

from google import genai
from google.generativeai import types

client = genai.Client(api_key="AIzaSyBdPDUWAiqBgZZiLIs-Td7fddaZ7i0IHgI")
response = client.models.generate_content(
    model='gemini-2.0-flash-001', contents='Why is the sky blue?'
)
print(response.text)

