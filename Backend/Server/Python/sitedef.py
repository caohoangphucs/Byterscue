from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS  
import sys
import os
from Utils import *
import api_call.geminiAPICall as geminiAPICall
import random
from datetime import datetime, timedelta
import json
import api_call.geminiAPICall as gemini
from PIL import Image
import Utils
import mongoControl
MAP_API_KEY = "AIzaSyA-0bMo6BMA8sOx-oDjeEBYOPXAwzFnYfo"
database = mongoControl.MongoDBHandler("hackathon2025", "people")
def get_recomment_aciton(detail):
    context = """Bạn là một một nhân viễn hỗ trợ cứu nạn cứu hộ, hãy đọc các thông tin bên dưới, trả về 1 đoạn lời khuyên về hành động tiếp theo, lời
                khuyên này nên ngắn gọn, xúc tích, tập trung vào vấn đề của nạn nhân, dài tầm 20-50 từ là được, hãy nói chuyện như là đang nói trực tiếp với nạn nhân
                113	Báo công an (khi có trộm cướp, gây rối trật tự, tội phạm)
                114	Báo cháy, cứu hộ cứu nạn (gọi Cảnh sát PCCC)
                115	Cấp cứu y tế (gọi xe cứu thương)
                111	Tổng đài bảo vệ trẻ em (hỗ trợ trẻ em bị bạo hành, xâm hại)
                1900 545 559	Đường dây nóng hỗ trợ tâm lý (trầm cảm, stress)
                1220	Hỗ trợ tìm kiếm cứu nạn trên biển
                1800 1567	Hỗ trợ phòng chống buôn bán người
                1900 9095	Đường dây nóng về HIV/AIDS
                1900 6192	Tư vấn phòng chống bạo lực gia đình
                1900 986 868	Đường dây nóng bảo vệ quyền lợi người tiêu dùng"""
    return gemini.generate_gemini_response(context + detail)
def get_recomment_aciton_rescuer(detail):
    context = """Bạn là người hỗ trợ của người cứu hộ, dưới đây là thông tin của người gặp nan, hãy đề xuất 1 hành động tiếp theo để người cứu hộ có thể thực hiện
                hành động không nên chung chung mà cá nhân hóa cho từng nạn nhân, dài tầm 30-50 từ, hành động càng cụ thể càng tốt, nhấn mạnh là chỉ dùng 1-2 câu văn
                không cần giải thích dựa vào đâu"""
    return gemini.generate_gemini_response(context + detail)
def describe_image(image_object):
    context = """Đây là 1 bức ảnh về 1 tai nạn, hãy phân tích hình ảnh chi tiết theo các yếu tố như bối cảnh, 
                sự việc chính, phân tích càng chi tiết càng tốt và đặc biệt chú ý những chi tiết quan trọng về
                 chấn chương, bị thương, hỏa hoạn, ...."""
    hint = ""
    with open(Utils.getcwd()+"data/context.txt", "r", encoding = "utf-8") as file:
        lines = file.readlines()
        for line in lines:
            hint += line
    result = gemini.generate_gemini_response(context + hint, image_object)
    return result
import requests
def get_street_view_url(coor):
    lat = coor[0]
    long = coor[1]
    url = f"https://www.google.com/maps/@?api=1&map_action=pano&viewpoint={lat},{long}"
    return url
def get_path_info( origin, destination):
    url = "https://maps.googleapis.com/maps/api/distancematrix/json"
    params = {
        "origins": origin,
        "destinations": destination,
        "mode": "driving",  # Các chế độ khác: walking, bicycling, transit
        "units": "metric",  # Đơn vị: metric (km), imperial (mile)
        "key": MAP_API_KEY
    }

    response = requests.get(url, params=params)
    data = response.json()

    if data["status"] == "OK":
        distance = data["rows"][0]["elements"][0]["distance"]["text"]
        duration = data["rows"][0]["elements"][0]["duration"]["text"]
        return distance, duration
    else:
        return None, None
def get_weather_info(address):
    context = """Hãy tìm kiếm về thời tiết của địa chỉ sau, viết chi tiết thông tin bao gồm mưa, nhiệt độ, độ ẩm, gió, bão,...
                chỉ viết thông tin thôi không cần giới thiệu gì cả, đặc biệt chú ý đến các yếu tố thiên tai"""
    return gemini.generate_gemini_response(context+address)
def get_request_detail(id):
    try:
        request = database.find_request(id)
        message = request["message"]
        coor = request["location"]
        id = request["id"]
        address=  request["address"]
        user_image = Utils.get_user_image(id)


        describe = describe_image(user_image)
        weather_info = get_weather_info(address)
        path_info = ""
        result = f"""
            - Chi tiết hình ảnh: 
                {describe}
            - Chi tiết thời tiết:
                {weather_info}
            - Mô tả người dùng:
                {message}
        """
        return result
    except Exception as e:
        return "Error bro what the fuck are you doing: "+str(e)