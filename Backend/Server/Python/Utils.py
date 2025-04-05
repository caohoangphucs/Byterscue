import re

def remove_special_chars(text):
    return re.sub(r'[^a-zA-Z0-9\s]', '', text)  
import json

import os
import sys
import requests
from PIL import Image
import io
import base64
from datetime import datetime
import math
from bson import json_util, ObjectId
data_path = "data/image/"
def form_data(data):
    return json.dumps(data,default=convert_mongo_types, ensure_ascii=False, indent=4)
 
def Log(message):
    os.system("echo "+message)

def Command(command):
    os.system(command)
def runIgnore(command):
    os.system(command + " > /dev/null 2>&1 &")
def isValidPort(port):
    try:
        int(port)
        return True
    except ValueError:
        Log("Port is not valid")
        return False
def getcwd(level=0):
    script_directory = os.path.dirname(os.path.abspath(__file__))  # Thư mục chứa script
    for i in range(0,level):
        script_directory = os.path.dirname(script_directory)
    return script_directory + "/"
configPath = "Server_Control/ServerConfig.conf"
def getConfigKey(key_name):
    return getcwd(3) + parse_config(getcwd(2)+"Server_Control/ServerConfig.conf")[key_name] 
def parse_config(file_path):
    config_dict = {}
    with open(file_path, "r", encoding="utf-8") as file:
        lines = file.readlines()
        for line in lines:
            line = line.strip()
            if ":" in line:  # Chỉ xử lý các dòng chứa dấu :
                key, value = line.split(":", 1)
                key = key.strip()
                value = value.strip().strip('"')  # Loại bỏ khoảng trắng và dấu ngoặc kép nếu có
                if value.isdigit():  # Chuyển số từ chuỗi sang dạng số nguyên
                    value = int(value)
                    config_dict[key] = value
                else:
                    config_dict[key] = value
    return config_dict

def writeLog(logPath, fromModule, message, ):
    
    if (logPath=="default"): 
        defaultPath = getConfigKey("logFile")
    else:
        defaultPath = logPath
    message = fromModule + "> " + message + "\n"
    with open(defaultPath, "a", encoding="utf-8") as file:
        file.write(message)

def kill(processName):
    os.system("pkill -f "+ processName)
    writeLog("default", "Killer", "Killed "+processName)

def runNode(path, port):
    Command("node" + path +" "+ port)
def updateSrc():
    Command("git pull origin main")
def getCurTime():
    return datetime.datetime.now()
def clearFile(filePath):
    with open(filePath, "w") as file:
        pass
def readLog(filePath):
    with open(filePath, "r") as file:
        lines = file.readlines()
        for line in lines:
            print(line)
def fetch_image(url):
    response = requests.get(url)
    if response.status_code == 200:
        img = Image.open(BytesIO(response.content))
        img.show()  
    else:
        print("Không thể tải ảnh từ URL.")    
def image_to_base64(image_path):
    with open(image_path, "rb") as image_file:
        base64_string = base64.b64encode(image_file.read()).decode('utf-8')
    return base64_string
def PILtoBase64(PIL_image):
    buffer = io.BytesIO()
    PIL_image.save(buffer, format="JPEG")
    buffer.seek(0)
    img_base64 = base64.b64encode(buffer.read()).decode("utf-8")
    return img_base64
def BinToBase64(BIN_image):
    return base64.b64encode(BIN_image).decode("utf-8")
def convert_mongo_types(obj):
    """Chuyển ObjectId & datetime thành string để JSON serializable"""
    if isinstance(obj, ObjectId):
        return str(obj)
    if isinstance(obj, datetime):
        return obj.isoformat()  # Chuyển datetime sang chuỗi
    raise TypeError(f"Type {type(obj)} not serializable")
def form_data(data):
    return json.dumps(data,default=convert_mongo_types, ensure_ascii=False, indent=4)
def haversine(lat1, lon1, lat2, lon2):
    # Chuyển đổi độ sang radian
    lat1, lon1, lat2, lon2 = map(math.radians, [lat1, lon1, lat2, lon2])

    # Tính chênh lệch giữa các tọa độ
    delta_lat = lat2 - lat1
    delta_lon = lon2 - lon1

    # Áp dụng công thức Haversine
    a = math.sin(delta_lat / 2)**2 + math.cos(lat1) * math.cos(lat2) * math.sin(delta_lon / 2)**2
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))

    # Bán kính Trái Đất (km)
    R = 6371.0

    # Khoảng cách giữa hai điểm
    distance = R * c
    return distance
