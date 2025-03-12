import os
import sys
import datetime

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
def getcwd():
    script_directory = os.path.dirname(os.path.abspath(__file__))  # Thư mục chứa script
    parent_directory = os.path.dirname(script_directory)  # Lùi lại 1 cấp
    return parent_directory + "/"
configPath = "Server_Control/ServerConfig.conf"
def getConfigKey(key_name):
    return getcwd() + parse_config(getcwd()+"Server_Control/ServerConfig.conf")[key_name] 
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