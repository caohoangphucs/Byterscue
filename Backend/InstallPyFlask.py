import os
import sys
def Log(message):
    os.system("echo "+message)
def Command(command):
    os.system(command)
def kill(processName):
    Command("pkill -f " + processName)
    Log("Killed " + processName)
