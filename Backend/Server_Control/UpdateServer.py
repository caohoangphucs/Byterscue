
import UpdateNgrok
import sys
import UpdateGitHook
import UpdatePyFlask
import UpdateNodejs
from Utils import *

# Read user config
modeList = {"local", "online", "shutdown"}
configPath = "Server_Control/ServerConfig.conf"
serverConfig = parse_config(getcwd()+configPath)
cwd = getcwd()
serverLog = cwd + serverConfig["logFile"]
serverMode = serverConfig["mode"]
pythonPort = int(serverConfig["pyPort"])
nodejsPort = int(serverConfig["nodePort"])
ngrokUrl = cwd + serverConfig["ngrokUrl"]
pyFlaskPath = cwd + serverConfig["flaskPath"]
nodejsPath = cwd + serverConfig["nodejsPath"]
def serverLogInit():
    clearFile(serverLog)
    writeLog(serverLog, "Server controller", str(getCurTime()))
    writeLog(serverLog,"Server controller", "Server Initing...")
def shutdown():
    kill("Flask")
    kill("ngrok")
    kill("node")
def runServer(port, mode):
    if (len(sys.argv) > 1):
        shutdown()
        writeLog("default", "Server controller", "Server is down !")
        readLog(serverLog)
        sys.exit()
    serverLogInit()
    if (mode == 'online'):
        kill("Flask")
        updateSrc()
        if not UpdateNgrok.isRunning():
            UpdateNgrok.restartNgrok(port)
        else:
            writeLog(serverLog,"Server controller","Ngrok is running at: " + UpdateNgrok.get_ngrok_url_PATH() + " Skipping....")
        UpdatePyFlask.runPyflask(pyFlaskPath, port)
        UpdateNodejs.runNode(nodejsPath, nodejsPort)
        readLog(serverLog)

runServer(pythonPort, serverMode)