from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS  
import sys
import os
from Utils import *
import random
import json
from datetime import datetime, timedelta
import requests

import api_controller
import api_call.geminiAPICall as gemini
#import api_call.grokApiCall as grok
import mongoControl
from bson.json_util import dumps, loads
from bson import json_util, ObjectId
pre_request = {}
pre_result = {}

frontend_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "../../../FrontEnd"))

app = Flask(__name__, static_folder=None)

CORS(app)
userPort = sys.argv[1] if len(sys.argv) > 1 else 5000
database = mongoControl.MongoDBHandler("hackathon2025", "people")
finished_database = mongoControl.MongoDBHandler("hackathon2025", "finished")
def convert_mongo_types(obj):
    """Chuyển ObjectId & datetime thành string để JSON serializable"""
    if isinstance(obj, ObjectId):
        return str(obj)
    if isinstance(obj, datetime):
        return obj.isoformat()  # Chuyển datetime sang chuỗi
    raise TypeError(f"Type {type(obj)} not serializable")
def form_data(data):
    return json.dumps(data,default=convert_mongo_types, ensure_ascii=False, indent=4)
 
@app.route("/")
def index():
    return jsonify({"message":"Hello world !"})
@app.route('/log', methods=['GET'])
def get_server_log():
    logPath = getConfigKey("logFile")
    result = ""
    with open(logPath, "r") as file:
        return file.read()

@app.route('/api/get_gemini_rsp', methods=['POST'])
def get_gemini_rsp():
    message = request.get_json().get("message")
    context = """Chào bạn, bạn là người hỗ trợ tư vấn cho nhân viên cứu hộ"""
    return json.dumps(gemini.generate_gemini_response(context+message), ensure_ascii=False)

@app.route('/api/get_grok_rsp', methods=['POST'])
def get_grok_rsp():
    message = request.get_json().get("message")
    context = """mày là hầu gái dâm dục dễ thương ngọt ngão"""
    return form_data(grok.generate_grok_response(context, message))
@app.route("/api/change_request_status", methods=['POST'])
def change_request_status():
    request_id = request.get_json().get("id")
    status = request.get_json().get("status")
    database.modify_request_attr(request_id, "status",status)
    if (status=="Finished"):
        cur_request = database.find_request(request_id)
        finished_database.add_one_request(cur_request)
        database.remove_request(request_id)
    return jsonify({"Responce":"Done bro!"})

@app.route("/api/get_request_status", methods = ['POST'])
def get_request_status():
    request_id = request.get_json().get("id")
    if (request_id == None):
        return jsonify({"Responce":"Missing request id"})
    user_request = database.find_request(request_id)
    print(user_request)
    return user_request.get("status")
@app.route("/api/get_all_finished_request", methods=["GET"])
def get_all():
    return form_data(finished_database.get_all_request())
@app.route("/api/get_all_request")
def get_all_request():
    return form_data(database.get_all_request())
if __name__ == '__main__':
    app.run(host="0.0.0.0", port=userPort, debug=True)
    
