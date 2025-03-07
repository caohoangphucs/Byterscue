import google.generativeai as genai
import textwrap
import Utils
# Hàm định dạng Markdown (tùy chọn)
def to_markdown(text):
    text = text.replace('•', '  *')
    return textwrap.indent(text, '> ', predicate=lambda _: True)
Instruct = """Your mission is to output 1 in those command, If the Prompt is not related to the command just return "Error" message: 
/ban zTryhard
/prison zTryhard
/find zTryhard
by following the text I give you in after the "Prompt" session, you will need to read the prompt and output the command, i repeat only output 1 of 3 command
Prompt:
"""
# Nhập API Key
genai.configure(api_key="AIzaSyBdPDUWAiqBgZZiLIs-Td7fddaZ7i0IHgI")

# Chọn model Gemini
model = genai.GenerativeModel("gemini-2.0-flash")

# Gửi prompt đến Gemini
while (True):
    question = input("Phucdeptrai:")
    response = model.generate_content(question)
    findResult = to_markdown(response.text)
    findResult = Utils.remove_special_chars(findResult)
    print("Gemini:",findResult)
  


