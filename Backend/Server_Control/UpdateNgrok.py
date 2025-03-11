import requests
import os
import time
from Utils import *
urlFilePath = "./NgrokUrl.txt"
def runNgrok(port):
    Command("ngrok http "+str(port)+" > /dev/null 2>&1 &")
    writeLog("default", "Ngrok", "Started ngrok with port:" + str(port))
def get_ngrok_url():
    try:
        response = requests.get("http://127.0.0.1:4040/api/tunnels")
        data = response.json()
        public_url = data["tunnels"][0]["public_url"]  # Lấy URL đầu tiên
        return public_url
    except Exception as e:
        return None
def isRunning():
    try:
        response = requests.get("http://127.0.0.1:4040/api/tunnels")
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
    if os.path.exists(urlFilePath):
        with open(urlFilePath, 'r') as file:
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
        url = get_ngrok_url()
        if url:
            break
        time.sleep(1)
    serverUrl = get_ngrok_url()
    writeUrlToFile(urlFilePath, serverUrl)
    writeLog("default", "Ngrok", "Completed Restart ngrok, server url: "+ serverUrl)
    os.system('echo "Server đã được cập nhật và restart!" | wall')
    return serverUrl