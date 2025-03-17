from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS  
import sys
import os
from Utils import *
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
if __name__ == '__main__':
    app.run(host="0.0.0.0", port=userPort, debug=True)
