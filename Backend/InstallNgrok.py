import requests
import json
import os
import time
def Log(message):
    os.system("echo "+message)
def Command(command):
    os.system(command)
def runNgrok(port):
    Command("ngrok http "+str(port)+" > /dev/null 2>&1 &")
    Log("Started ngrok with port:" + port)
def get_ngrok_url():
    try:
        response = requests.get("http://127.0.0.1:4040/api/tunnels")
        data = response.json()
        public_url = data["tunnels"][0]["public_url"]  # Lấy URL đầu tiên
        return public_url
    except Exception as e:
        return None
def killNgrok():
    Command("pkill ngrok")
    Command("echo Killed all ngrok.\n")
def writeUrlToFile(filePath, url):
    if not os.path.exists(filePath):
        Log("Url file not found.")
    with open(filePath, 'w', ) as file:
        file.write(url)
        Log("Ngrok Url writed to "+filePath)
def restartNgrok(port):
    Log("Restarting ngrok")
    runNgrok(port)
    Log("Waitng for url...")
    for _ in range(10):  # Retry up to 10 times
        url = get_ngrok_url()
        if url:
            break
        time.sleep(1)
    serverUrl = get_ngrok_url()
    writeUrlToFile("./NgrokUrl.txt", serverUrl)
    Log("Completed Restart ngrok, server url: "+ serverUrl)
    os.system('echo "Server đã được cập nhật và restart!" | wall')
    return serverUrl