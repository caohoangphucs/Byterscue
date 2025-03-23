from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS  
import sys
import os
from Utils import *
import random
import json
from datetime import datetime, timedelta


import api_controller
import nodejs_comunicate_controll
pre_request = {}
pre_result = {}

frontend_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "../../../FrontEnd"))

app = Flask(__name__, static_folder=None)

CORS(app)
userPort = sys.argv[1] if len(sys.argv) > 1 else 5000

@app.route("/")
def index():
    return jsonify({"message":"Hello world !"})
@app.route('/log', methods=['GET'])
def get_server_log():
    logPath = getConfigKey("logFile")
    result = ""
    with open(logPath, "r") as file:
        return file.read()
@app.route("/get_status", methods = ["POST"]) 
def get_priority_status():
     global pre_request
     pre_request = api_controller.get_priority_status(request)
     return api_controller.get_priority_status(request)
@app.route("/node_comunicate/get_form_info", methods = ["GET"])
def send_form_info():
    return nodejs_comunicate_controll.send_info(pre_request)

@app.route("/node_comunicate/recieve_request", methods = ["POST"])
def recieve_request():
    global pre_result
    pre_result = nodejs_comunicate_controll.recieve_request(request)
    return jsonify({"status" : "POST OK"})
@app.route("/get_result", methods = ["GET"])
def send_result():
    return json.dumps(pre_result, ensure_ascii = False)
if __name__ == '__main__':
    app.run(host="0.0.0.0", port=userPort, debug=True)
    
