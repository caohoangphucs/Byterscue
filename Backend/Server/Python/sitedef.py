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
import api_call.grokApiCall as grok
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
    return grok.generate_grok_response(context, detail)
def get_recomment_aciton_rescuer(detail):
    context = """Bạn là người hỗ trợ của người cứu hộ, dưới đây là thông tin của người gặp nan, hãy đề xuất 1 hành động tiếp theo để người cứu hộ có thể thực hiện
                hành động không nên chung chung mà cá nhân hóa cho từng nạn nhân, dài tầm 30-50 từ, hành động càng cụ thể càng tốt, nhấn mạnh là chỉ dùng 1-2 câu văn
                không cần giải thích dựa vào đâu"""
    return gemini.generate_gemini_response(context ,detail)
def describe_image(image_object):
    context = """Chào bạn, bạn là người hỗ trợ tư vấn cho nhân viên cứu hộ, nếu có hình ảnh thì dựa vào hình ảnh để trả lời người dùng
                hãy trả lời ngắn gọn và đúng trọng tâm, như mô tả
                các đặc trưng của hình ảnh, """
    result = gemini.generate_grok_response(context ,"mô tả ảnh", image_object)
    return result
import requests
def get_embed_map_url(coor):
    lat = coor[0]
    long = coor[1]
    return f"https://www.google.com/maps/embed/v1/view?key=AIzaSyA-0bMo6BMA8sOx-oDjeEBYOPXAwzFnYfo&&center={lat},{long}&zoom=16&maptype=satellite"
def get_streetview_script(coor):
    lat = coor[0]
    long = coor[1]
    script_url  = f"https://maps.googleapis.com/maps/api/js?key={MAP_API_KEY}&callback=initStreetView"
    script = requests.get(script_url).text
    script2 = """
    function initStreetView() {
    var location = { lat: _USERLATITUTE, lng: _USERLONGTITUTE }; // Vị trí ban đầu
    var panorama;
    var nearbyPanos = []; // Mảng lưu các panorama lân cận trong bán kính
    var currentIndex = 0;

    // Khởi tạo Street View Panorama
    panorama = new google.maps.StreetViewPanorama(
        document.getElementById('street-view'),
        {
            position: location,
            pov: { heading: 165, pitch: 0 },
            zoom: 1,
            addressControl: false,
            linksControl: true
        }
    );

    // Sử dụng StreetViewService để tìm các panorama trong bán kính
    var svService = new google.maps.StreetViewService();
    var radius = 100; // Bán kính (mét), có thể điều chỉnh

    svService.getPanorama({ location: location, radius: radius }, function(data, status) {
        if (status === google.maps.StreetViewStatus.OK) {
            // Lưu panorama ban đầu
            nearbyPanos.push({
                pano: data.location.pano,
                lat: data.location.latLng.lat(),
                lng: data.location.latLng.lng()
            });

            // Tìm thêm các panorama lân cận trong bán kính
            findNearbyPanos(location, radius, svService, nearbyPanos);
        } else {
            console.log("Không tìm thấy Street View tại vị trí này.");
        }
    });

    // Hàm tìm các panorama trong bán kính
    function findNearbyPanos(center, radius, service, panosArray) {
        // Tạo một số điểm xung quanh vị trí trung tâm
        var step = 0.0005; // Khoảng cách nhỏ (độ lat/lng), tương đương ~50m
        var directions = [
            { lat: step, lng: 0 },   // Bắc
            { lat: -step, lng: 0 },  // Nam
            { lat: 0, lng: step },   // Đông
            { lat: 0, lng: -step }   // Tây
        ];

        directions.forEach(dir => {
            var newLocation = {
                lat: center.lat + dir.lat,
                lng: center.lng + dir.lng
            };
            service.getPanorama({ location: newLocation, radius: radius }, function(data, status) {
                if (status === google.maps.StreetViewStatus.OK) {
                    var newPano = {
                        pano: data.location.pano,
                        lat: data.location.latLng.lat(),
                        lng: data.location.latLng.lng()
                    };
                    // Tránh trùng lặp
                    if (!panosArray.some(p => p.pano === newPano.pano)) {
                        panosArray.push(newPano);
                    }
                    console.log("Panorama lân cận:", newPano);
                }
            });
        });
    }

    // Hàm chuyển sang panorama lân cận trong bán kính
    window.showNextPano = function() {
        if (nearbyPanos.length > 0) {
            currentIndex = (currentIndex + 1) % nearbyPanos.length;
            var nextPano = nearbyPanos[currentIndex];
            panorama.setPano(nextPano.pano);

            // Tính heading từ vị trí hiện tại đến panorama lân cận
            var heading = google.maps.geometry.spherical.computeHeading(
                panorama.getPosition(),
                new google.maps.LatLng(nextPano.lat, nextPano.lng)
            );
            panorama.setPov({ heading: heading, pitch: 0 });
        } else {
            console.log("Chưa tìm thấy ảnh lân cận trong bán kính.");
        }
    };
    console.log("All image around: ", nearbyPanos)
}
    """
    script2 = script2.replace("_USERLATITUTE", str(lat)).replace("_USERLONGTITUTE", str(long))
    full_script = script + script2
    return full_script
    
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
                chỉ viết thông tin thôi không cần giới thiệu gì cả, đặc biệt chú ý đến các yếu tố thiên tai, tầm 50 từ thôi"""
    return gemini.generate_gemini_response(context+address)
def get_request_detail(id):
    try:
        request = database.find_request(id)
        message = request["message"]
        coor = request["location"]
        id = request["id"]
        address=  request["address"]
        user_image = Utils.image_to_base64(id)


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