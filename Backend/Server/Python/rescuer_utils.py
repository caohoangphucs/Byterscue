from Utils import *
import api_call.geminiAPICall as gemini
import api_call.grokApiCall as grok
import mongoControl
from flask import Blueprint, jsonify, request
rescuerdb = mongoControl.MongoDBHandler("hackathon2025", "rescuer")
def add_rescuer(request):
    try:
        data = request.get_json()

        # Kiểm tra dữ liệu cần thiết
        required_fields = ["id", "name", "age", "phone", "vehicle", "status", "location"]
        for field in required_fields:
            if field not in data:
                return jsonify({"error": f"Missing field: {field}"}), 400

        # Chuẩn hóa dữ liệu
        rescuer = {
            "id": data["id"],
            "name": data["name"],
            "age": int(data["age"]),
            "phone": data["phone"],
            "vehicle": data["vehicle"],
            "status": data["status"],  # nên giới hạn là READY / NOT_READY
            "address": {
                "latitude": float(data["address"]["latitude"]),
                "longitude": float(data["address"]["longitude"])
            },
            "location": {
                "latitude": float(data.get("location", {}).get("latitude", 0.0)),
                "longitude": float(data.get("location", {}).get("longitude", 0.0))
            },
            "skill": data["skill"]
        }
        if (rescuerdb.find_request(data["id"]) != None):
            return "Người cứu hộ này đã tồn tại"
        # Thêm vào database
        result = rescuerdb.add_one_request(rescuer)

        return jsonify({
            "message": "Thêm người cứu hộ thành công"
        }), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500
def find_rescuer(request):
    rescuer_id = request.get_json().get("id")
    if (rescuerdb.find_request(rescuer_id) == None): return "rescuer not found"
    return rescuerdb.find_request(rescuer_id)
def update_status(request):
    try:
        rescuer_id = str(request.get_json().get("id"))
        print("HI")
        print(request.get_json())
        if (rescuerdb.find_request(rescuer_id) == None): return "rescuer not found"
        rescuer_status = request.get_json().get("status")
        rescuerdb.modify_request_attr(rescuer_id, "status", rescuer_status)
        return "Ok good, Get ready for helping people "
    except Exception as e:
        return jsonify({"error": str(e)}), 500
def update_location(request):
    try:
        rescuer_id = request.get_json().get("id")
        if (rescuerdb.find_request(rescuer_id) == None): return "rescuer not found"
        rescuer_location = request.get_json().get("location")
        rescuerdb.modify_request_attr(rescuer_id, "location", rescuer_location)
    except Exception as e:
        return jsonify({"error": str(e)}), 500