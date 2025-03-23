from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS  
import sys
import os
from Utils import *
import api_call.geminiAPICall as geminiAPICall
import random
from datetime import datetime, timedelta
import json
chatbot_data_path = "data/project_info.txt"
def chatbot():
    try:
        data = request.get_json()
        if not data or 'message' not in data:
            return jsonify({"Error": "Thiếu tham số 'message'"}), 400
        
        question = data['message']
        data = "Đây là dữ liệu của dự án:"
        with open(getcwd(0) + chatbot_data_path, "r", encoding="utf-8") as file:
            lines = file.readlines()
            for line in lines:
                data += line.strip() + " "
      
        context = """Bạn là 1 chatbot agent, hãy trả lời thông tin mà bạn dbiết được, 
                    tên của dự án là ByteForce UTE của hackathon, trả lời ngắn gọn, 
                     chữ về chủ đề công nghệ, trả lời một cách dể hiểu, chỉ trả lời với những thông tin người dùng quan tâm.
                    
                    Sau đây là câu hỏi của user, trả lời bằng tiếng việt:
                    
                    """
        context1 = """Yêu cầu bạn đưa ra kinh độ, vĩ độ của 1 vị trí, không đưa thông tin gì thêm, ở dạng thập phân
            không cần hướng không giải thích, chỉ đưa 1 cặp giá trị, câu hỏi của người, hãy dùng google map nếu có thể
                        dùng sẽ là 1 địa điểm, hãy trả về đúng yêu cầu và không có thông tin thừa,
                        câu hỏi:
                        """
        context2 = """Yêu cầu bạn dựa trên 1 đoạn message của người dùng, hãy đưa ra là 1 số thập phân trong khoảng từ 0 tới 1, càng 
                        gần 1 thì sẽ càng ưu tiên , không giải thích gì thêm, 
                        Các mức độ ưu tiên dựa trên sau:
                        0.0 - 0.3 → Mức độ nhẹ (Bị thương)

                        0.3 - 0.5 → Mức độ trung bình (Bị lạc)

                        0.5 - 0.7 → Mức độ nghiêm trọng (Bị ăn cắp)

                        0.7 - 0.9 → Mức độ rất nghiêm trọng (Bị bắt cóc)
                        hãy phân tích cảm xúc của đoạn đó dựa trên từ ngữ, mức độ, câu văn,
                        đây là đoạn tin nhắn:
                        MESSAGE:
                        """
        # Gọi API để lấy câu trả lời
        answer = geminiAPICall.generate_gemini_response(context2+  question)
        
        # Trả về kết quả JSON đúng chuẩn UTF-8
        response = json.dumps({"Chat answer:":answer}, ensure_ascii = False)
        return response
    except Exception as e:
        return jsonify({"Error": str(e)}), 500
def get_priority_status(request):
    message = request.get_json().get("message")
    address = request.get_json().get("address")
    point = get_priority_point(message)
    status = "low"
    if (point > 0.7): status = "high"
    print(status)
    result = {
        "message" : message,
        "address" : address,
        "priority" : status,
    }
    return json.dumps(result, ensure_ascii = False)
    
def get_priority_point(message) -> float:
    try:
        context2 = """Yêu cầu bạn dựa trên 1 đoạn message của người dùng, hãy đưa ra là 1 số thập phân trong khoảng từ 0 tới 1, càng 
                        gần 1 thì sẽ càng ưu tiên , không giải thích gì thêm, 
                        Các mức độ ưu tiên dựa trên sau:
                        0.0 - 0.3 → Mức độ nhẹ (Bị thương)

                        0.3 - 0.5 → Mức độ trung bình (Bị lạc)

                        0.5 - 0.7 → Mức độ nghiêm trọng (Bị ăn cắp)

                        0.7 - 0.9 → Mức độ rất nghiêm trọng (Bị bắt cóc)
                        hãy phân tích cảm xúc của đoạn đó dựa trên từ ngữ, mức độ, câu văn,
                        đây là đoạn tin nhắn:
                        MESSAGE:
                        """
        # Gọi API để lấy câu trả lời
        answer = geminiAPICall.generate_gemini_response(context2+  message)
        return float(answer)
    except Exception as e:
        return 0.0