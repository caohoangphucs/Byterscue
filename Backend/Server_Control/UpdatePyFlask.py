from Utils import writeLog, Command, runIgnore
def runPyflask(path, port):
    runIgnore("python3 " + path +" "+ str(port))
    writeLog("default", "Flask", "Flask is up!")