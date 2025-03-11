
import UpdateNgrok
import sys
import UpdateGitHook
import UpdatePyFlask
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
ngrokUrl = cwd + serverConfig["NgrokUrl"]
pyFlaskPath = cwd + serverConfig["FlaskPath"]

def shutdown():
    kill("Flask")
    kill("ngrok")
    kill("node")
def runServer(port, mode):
    clearFile(serverLog)
    writeLog(serverLog, "Server controller", str(getCurTime()))
    writeLog(serverLog,"Server controller", "Server Initing...")
    if (mode == 'online'):
        kill("Flask")
        updateSrc()
        if not UpdateNgrok.isRunning():
            UpdateNgrok.restartNgrok(port)
        else:
            writeLog(serverLog,"Server controller","Ngrok is running at: " + UpdateNgrok.get_ngrok_url() + " Skipping....")
        UpdatePyFlask.runPyflask(pyFlaskPath, port)
        readLog(serverLog)
if (len(sys.argv) > 1):
    shutdown()
    sys.exit()
runServer(pythonPort, serverMode)