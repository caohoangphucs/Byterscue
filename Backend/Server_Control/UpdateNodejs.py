from Utils import writeLog, Command, runIgnore
def runNode(path, port):
    runIgnore("node " + path )
    writeLog("default", "Node", f"Node is up, listing on port {port}!")