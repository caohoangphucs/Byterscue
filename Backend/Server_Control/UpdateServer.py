import sys
import UpdatePyFlask
import UpdateNodejs
import UpdateVite
from Utils import *

# Read user config
modeList = {"local", "online", "shutdown"}
configPath = "Backend/Server_Control/ServerConfig.conf"
serverConfig = parse_config(getcwd()+configPath)
cwd = getcwd()
serverLog = cwd + serverConfig["logFile"]
serverMode = serverConfig["mode"]
pythonPort = int(serverConfig["pyPort"])
nodejsPort = int(serverConfig["nodePort"])
pyFlaskPath = cwd + serverConfig["flaskPath"]
nodejsPath = cwd + serverConfig["nodejsPath"]
vitePort = int(serverConfig["vitePort"])
vitePath = cwd + serverConfig["vitePath"]
def serverLogInit():
    clearFile(serverLog)
    writeLog(serverLog, "Server controller", str(getCurTime()))
    writeLog(serverLog,"Server controller", "Server Initing...")
def shutdown(port):
    kill("Flask")
    kill("node")
    kill("vite")
    Command("sudo lsof -i :"+str(port)+" | awk '{print $2}' | grep -o '[0-9]*' | xargs sudo kill -9")
def runServer(port, mode):
    if (len(sys.argv) > 1):
        shutdown(port)
        writeLog("default", "Server controller", "Server is down !")
        readLog(serverLog)
        sys.exit()
    serverLogInit()
    if (mode == 'online'):
        kill("Flask")
        updateSrc()    
        UpdatePyFlask.runPyflask(pyFlaskPath, pythonPort)
        UpdateNodejs.runNode(nodejsPath, nodejsPort)
        UpdateVite.runVite(vitePath, vitePort)
        writeLog("default"," Server controller", "Server is up!, \n Visit site https://byteforce.caohoangphuc.id.vn.")
        readLog(serverLog)

runServer(vitePort, serverMode)