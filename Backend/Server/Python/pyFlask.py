from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS  
import sys
import os
from Utils import *
import random
import json
from datetime import datetime, timedelta
import requests

import sitedef
import api_call.geminiAPICall as gemini
import api_call.grokApiCall as grok
import mongoControl
from bson.json_util import dumps, loads
from PIL import Image
from bson import json_util, ObjectId
import base64
pre_request = {}
pre_result = {}

frontend_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "../../../FrontEnd"))

app = Flask(__name__, static_folder=None)

CORS(app)
userPort = sys.argv[1] if len(sys.argv) > 1 else 5000
database = mongoControl.MongoDBHandler("hackathon2025", "people")
finished_database = mongoControl.MongoDBHandler("hackathon2025", "finished")
rescuer = mongoControl.MongoDBHandler("hackathon2025", "rescuer")
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
@app.route('/api/get_recomment_action_client', methods=['POST'])
def get_recomment_aciton():
    try:
        request_id = request.get_json().get("id")
        print(request_id)
        detail = database.find_request(request_id).get("details")
        return sitedef.get_recomment_aciton(detail)
    except Exception as e:
        return "Request đã được xử lý hoặc không tồn tại" 
@app.route("/api/get_recomment_action_rescuer", methods=['POST'])
def get_recomment_aciton_rescuer():
    try:
        request_id = request.get_json().get("id")
        print(request_id)
        detail = database.find_request(request_id).get("details")
        return sitedef.get_recomment_aciton_rescuer(detail)
    except Exception as e:
        return "Request đã được xử lý hoặc không tồn tại" 
@app.route('/api/get_gemini_rsp', methods=['POST'])
def get_gemini_rsp():
    message = request.form.get("message")
    try:
        image = request.files["image"]
        request_image = Image.open(image)
    except:
        request_image = ""
    context = """Chào bạn, bạn là người hỗ trợ tư vấn cho nhân viên cứu hộ, nếu có hình ảnh thì dựa vào hình ảnh để trả lời người dùng
                nếu cần search thêm thông tin về địa điểm đó thì dựa vào thông tin search và cả hình ảnh nữa, hãy trả lời ngắn gọn và đúng trọng tâm, như mô tả
                các đặc trưng của hình ảnh, """
    return json.dumps(gemini.generate_gemini_response(context+message, request_image), ensure_ascii=False)
@app.route('/api/save_image', methods=['POST'])
def save_image():
    try:
        request_id = request.form.get("id")
        image = request.files['image']
        save_path = getcwd()+"data/image/"+f"{request_id}.jpg"
        print(save_path)
        image.save(save_path)
        database.add_atr(request_id, "details", sitedef.describe_image(image.open()))
        return "ok gud job, i saved your image"
    except Exception as e:
        return "Fucking error bro: "+str(e)
@app.route('/api/get_streetview_script', methods=['GET'])
def get_script():
    request_id = request.args.get("id")
    request_coor = database.find_request(request_id).get("location")
    return sitedef.get_streetview_script(request_coor)
@app.route('/api/get_grok_rsp_rescuer', methods=['POST'])
def client_chat():
    request_id = request.get_json().get("id")
    question = request.get_json().get("message")
    client_request = database.find_request(request_id)
    try:
        save_path = getcwd()+"data/image/"+f"{request_id}.jpg"
        base64_image = image_to_base64(save_path)
    except:
        base64_image=""
    
    context = f"""Bạn là người hỗ trợ tư vấn cho người giải cứu nạn nhân gặp nạn, đây là thông tin cầu cứu của người dùng:
                    thông tin cầu cứu {client_request}, sài hình ảnh nữa,trả lời người người giải cứu, tự nhiên, ngắn gọn, 1 đoạn
                    """
    return grok.generate_grok_response(context, question, base64_image)

@app.route('/api/get_grok_rsp', methods=['POST'])
def get_grok_rsp():
    base64_image=""
    try:
        message = request.form.get("message")
        image = request.files["image"]
        base64_image = BinToBase64(image.read())
    except Exception as e:
        print("Suck me dick with error :" + str(e))    
    context = """Mày là trợ lý của dự án Byteforce rescure, hãy trả lời người dùng láo nhất có thể, chửi chết con mẹ nó luôn,
                Hãy tập trung vào yếu tố giải pháp, câu trả lời cụ thể và xúc tích"""
    return form_data(grok.generate_grok_response(context, message, base64_image))
@app.route('/api/describe_image', methods=['POST'])
def describe_image():
    base64_image=""
    
    try:
        message = request.form.get("message")
        image = request.files["image"]
        base64_image = BinToBase64(image.read())
    except Exception as e:
        print("Suck me dick with error :" + str(e))    
    if not message: message = "describe for me"
    context = """hãy dựa vào hình ảnh, tìm các yếu tố có thể gây ảnh hưởng tới sự an toàn, không giải thích dài dòng, hãy chú trọng những thông tin quan trọng, trả lời tầm 50 chữ
                 Tiếp theo, tìm các đặc điểm nhận dạng đặc trưng của nơi trong ảnh, cái gì đặc trung và dễ thấy nhất càng tốt, không dài dòng    """
    return form_data(grok.generate_grok_response(context, message, base64_image))
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
@app.route('/api/get_embed_map', methods=['GET'])
def get_embed_map():
    request_id = request.args.get("id")
    request_coor = database.find_request(request_id).get("location")
    return sitedef.get_embed_map_url(request_coor)
@app.route("/api/get_request_status", methods = ['POST'])
def get_request_status():
    request_id = request.get_json().get("id")
    if (request_id == None):
        return jsonify({"Responce":"Missing request id"})
    user_request = database.find_request(request_id)
    if user_request==None:
        user_request = finished_database.find_request(request_id)
    if (user_request==None): return "Đéo thấy id nào như này cả thằng súc vật"
    return user_request.get("status")
@app.route("/api/get_all_finished_request", methods=["GET"])
def get_all():
    return form_data(finished_database.get_all_request())
@app.route("/api/get_all_request")
def get_all_request():
    return form_data(database.get_all_request())
if __name__ == '__main__':
    app.run(host="0.0.0.0", port=userPort, debug=True)
    
