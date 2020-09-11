import os
import shutil

fileDir = os.path.dirname(os.path.abspath(__file__))
backendDir = os.path.dirname(fileDir)
publishDir =os.path.join(os.path.dirname(backendDir), 'publish')

def copyBackendToPublish(src, dst):
    for item in os.listdir(src):
        s = os.path.join(src, item)
        d = os.path.join(dst, item)
        if os.path.isdir(s) and item != 'scripts':
            shutil.copytree(s, d)
        elif os.path.isfile(s):
            shutil.copyfile(s, d)

def cleanPublish():
    for item in os.listdir(publishDir):
        s = os.path.join(publishDir, item)
        if os.path.isdir(s) and item != 'build':
            shutil.rmtree(s)
        elif os.path.isfile(s):
            os.remove(s)

cleanPublish()
copyBackendToPublish(backendDir, publishDir)