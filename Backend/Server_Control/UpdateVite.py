from Utils import writeLog, Command, runIgnore, getcwd
def runVite(path, port):

    runIgnore(f"npm --prefix {path} run dev -- --port {port}")
    writeLog("default", "vite", f"vite from {path} is up , listening on port " + str(port))
    runIgnore("cd "+getcwd())