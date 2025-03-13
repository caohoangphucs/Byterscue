from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS  
import sys
import os
from Utils import *
# Xác định đường dẫn tuyệt đối đến thư mục FrontEnd
frontend_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "../../../FrontEnd"))
print("Frontend path:", frontend_path)  # Debug: kiểm tra đường dẫn

# Tắt cơ chế static của Flask bằng cách set static_folder=None
app = Flask(__name__, static_folder=None)
CORS(app)

userPort = sys.argv[1] if len(sys.argv) > 1 else 5000

@app.route("/")
def index():
    # Kiểm tra xem file index.html có tồn tại không
    index_path = os.path.join(frontend_path, "index.html")
    print("Looking for index at:", index_path)  # Debug
    return send_from_directory(frontend_path, "index.html")

@app.route("/<path:filename>")
def serve_static(filename):
    return send_from_directory(frontend_path, filename)

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
    

def caculate(a, b):
    return a + b

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=userPort, debug=True)
