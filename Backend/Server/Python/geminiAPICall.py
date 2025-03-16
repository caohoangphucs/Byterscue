import google.generativeai as genai
genai.configure(api_key="AIzaSyBdPDUWAiqBgZZiLIs-Td7fddaZ7i0IHgI")

def generate_gemini_response(prompt):
    """Gọi API Google Gemini để sinh câu trả lời"""
    try:
        model = genai.GenerativeModel("gemini-1.5-flash")  
        response = model.generate_content(prompt)
        return response.text if hasattr(response, 'text') else response.candidates[0].text
    except Exception as e:
        print(f"❌ Lỗi khi gọi Gemini API: {e}")
        return "⚠️ Không thể tạo câu trả lời!"