from Utils import *
import api_call.geminiAPICall as gemini
import api_call.grokApiCall as grok
import mongoControl
from flask import Blueprint, jsonify, request
import rescuer_utils
rescuer_bp = Blueprint("rescuer", __name__)
rescuerdb = mongoControl.MongoDBHandler("hackathon2025", "rescuer")
@rescuer_bp.route('/get_rescuer_info', methods=['POST'])
def get__rescuer_info():
    return form_data(rescuer_utils.find_rescuer(request))
@rescuer_bp.route("/creat_rescuer", methods=["POST"])
def add_request():
    return rescuer_utils.add_rescuer(request)
@rescuer_bp.route("/get_rescuer_status", methods=["POST"])
def get_info():
    return rescuer_utils.find_rescuer(request).get("status")
@rescuer_bp.route("/get_scuer_location", methods=["POST"])
def get_location():
    return rescuer_utils.find_rescuer(request).get("location")
@rescuer_bp.route("/get_all_rescuer", methods=["GET"])
def get_status():
    all_rescuer = rescuerdb.get_all_request()
    return form_data(all_rescuer)
@rescuer_bp.route('/change_status', methods=['POST'])
def change_status():
    data = request.get_json()
    id = data["id"]
    status = data["status"]
    rescuerdb.modify_request_attr(id, "status", status)
    return "OK ready for helping people, gud look !"
@rescuer_bp.route("/get_ready", methods=["POST"])
def get_ready():
    rescuer_utils.update_status(request)
    rescuer_utils.update_location(request)
    return "Ok let help people"
@rescuer_bp.route("/get_rest", methods=['POST'])
def get_rest():
    rescuer_utils.update_status(request)
    return "Ok see you again"

