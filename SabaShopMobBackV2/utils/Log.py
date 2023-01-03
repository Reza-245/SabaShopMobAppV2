import json

def Log(data):
    logFile = open("./logs.txt","a")
    # logFile.write(json.dumps(data) + '\n')
    logFile.write(repr(data) + "\n")
    logFile.close()
