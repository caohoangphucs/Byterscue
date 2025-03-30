from google import genai
from google.genai import types
from PIL import Image
client = genai.Client(api_key="AIzaSyBdPDUWAiqBgZZiLIs-Td7fddaZ7i0IHgI")
def generate_gemini_response(prompt, image = "", search=False):
    response = client.models.generate_content(
        model='gemini-2.0-flash',
        contents= [prompt, image],
            config=types.GenerateContentConfig(
                tools=[
                    types.Tool(
                        google_search=types.GoogleSearch()
                    )
                ]
            )
        
    )
    return response.text