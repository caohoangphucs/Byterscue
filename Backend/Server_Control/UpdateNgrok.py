import requests
import os
import time
from Utils import *
NGROK_URL_PATH = getConfigKey("ngrokUrl") 
NGROK_API = "http://127.0.0.1:4040/api/tunnels"
def runNgrok(port):
    Command("ngrok http "+str(port)+" > /dev/null 2>&1 &")
    writeLog("default", "Ngrok", "Started ngrok with port:" + str(port))
def get_ngrok_url_PATH():
    try:
        response = requests.get(NGROK_API)
        data = response.json()
        public_url = data["tunnels"][0]["public_url"]  # Lấy URL đầu tiên
        return public_url
    except Exception as e:
        return None
def isRunning():
    try:
        response = requests.get(NGROK_API)
        if response.status_code == 200:
            return True
        else:
            return False
    except requests.ConnectionError:
        return False
def writeUrlToFile(filePath, url):
    if not os.path.exists(filePath):
        writeLog("default", "Ngrok", "Url file not found.")
    with open(filePath, 'w', ) as file:
        file.write(url)
        writeLog("default", "Ngrok", "Ngrok Url writed to "+filePath)
def getCurrentUrl():
    if os.path.exists(NGROK_URL_PATH):
        with open(NGROK_URL_PATH, 'r') as file:
            url = file.read().strip()
            return url
    else:
        writeLog("default", "Ngrok", "Url file not found.")
        return None
def restartNgrok(port):
    writeLog("default", "Ngrok", "Restarting ngrok")
    runNgrok(port)
    writeLog("default", "Ngrok", "Waitng for url...")
    for _ in range(10):  # Retry up to 10 times
        url = get_ngrok_url_PATH()
        if url:
            break
        time.sleep(1)
    serverUrl = get_ngrok_url_PATH()
    writeUrlToFile(NGROK_URL_PATH, serverUrl)
    writeLog("default", "Ngrok", "Completed Restart ngrok, server url: "+ serverUrl)
    return serverUrl