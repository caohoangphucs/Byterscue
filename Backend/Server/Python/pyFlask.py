from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS  
import sys
import os
from Utils import *
import geminiAPICall
import json
chatbot_data_path = "project_data/hackathon_information.txt"
frontend_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "../../../FrontEnd"))

app = Flask(__name__, static_folder=None)

CORS(app)
userPort = sys.argv[1] if len(sys.argv) > 1 else 5000

@app.route("/")
def index():
    return jsonify({"message":"Chào con đĩ, tao là python"})

@app.route('/api', methods=['POST'])
def receive_data():
    data = request.form.get('text')
    
    if not data:
        return jsonify({"error": "Không nhận được dữ liệu"}), 400
    
    print("Dữ liệu nhận được:", data)  # Debug trong terminal
    return jsonify({"result": data})
@app.route('/log', methods=['GET'])
def get_server_log():
    logPath = getConfigKey("logFile")
    result = ""
    with open(logPath, "r") as file:
        return file.read()
@app.route('/github-webhook', methods=['POST'])
def resetServer():
    updatePath = os.path.abspath(os.path.join(os.path.dirname(__file__), "../../Server_Control/UpdateServer.py"))
    os.system('python3 ' + updatePath)
    return jsonify({"status": "Server reset initiated", "path": updatePath})
@app.route('/getchatbotanswer', methods=['POST'])
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
      
        context = """Bạn là 1 chatbot agent, hãy trả lời thông tin mà bạn biết được, 
                    tên của dự án là ByteForce UTE của hackathon, trả lời ngắn gọn, 
                     chữ về chủ đề công nghệ, trả lời một cách dể hiểu, chỉ trả lời với những thông tin người dùng quan tâm.
                    
                    Sau đây là câu hỏi của user, trả lời bằng tiếng việt:
                    
                    """
     
        # Gọi API để lấy câu trả lời
        answer = geminiAPICall.generate_gemini_response(data + context + question)
        
        # Trả về kết quả JSON đúng chuẩn UTF-8
        response = json.dumps({"Chat answer:":answer}, ensure_ascii = False)
        return response
    
    except Exception as e:
        return jsonify({"Error": str(e)}), 500
if __name__ == '__main__':
    app.run(host="0.0.0.0", port=userPort, debug=True)
    
