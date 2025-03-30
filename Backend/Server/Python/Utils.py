import re

def remove_special_chars(text):
    return re.sub(r'[^a-zA-Z0-9\s]', '', text)  

import os
import sys
import datetime
import requests
from PIL import Image
from io import BytesIO
data_path = "data/image/"
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
def get_user_image(user_id):
    return Image.open(getcwd()+data_path+user_id+".jpg")