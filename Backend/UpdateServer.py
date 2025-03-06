import os
import InstallNgrok
import sys
import InstallPyFlask
import UpdateGitHook
modeList = {"local", "online"}
pyFlaskPath = "./Server/Python/pyFlask.py"
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
    
def checkServerArg():
    if (len(sys.argv) < 2 or sys.argv[1] not in modeList):
        Log("Server Init need Mode to run ('local' / 'online')")
        sys.exit(1)
    if (len(sys.argv) < 3 or not isValidPort(sys.argv[2])) :
        Log("Server Init need valid port to run")
        sys.exit(1)
    return True

def runPyflask(path, port):
    runIgnore("python3 " + path +" "+ port)
    Log("Flask is up!")
    #Command("python3 "+path+" "+port)
def runNode(path, port):

    Command("node" + path +" "+ port)
def updateSrc():
    Command("git pull origin main")
def runServer(port, mode):
    Log("Server Initing...")
    if (mode == 'online'):
        InstallPyFlask.kill("Flask")
        InstallNgrok.killNgrok()
        updateSrc()
        InstallNgrok.restartNgrok(port)
        UpdateGitHook.updateGitHook()
        runPyflask(pyFlaskPath, port)

    # runNode()
if (checkServerArg()):
    userMode = sys.argv[1]
    userPort = sys.argv[2]
    runServer(userPort, userMode)