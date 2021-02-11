import os
import shutil

fileDir = os.path.dirname(os.path.abspath(__file__))
backendDir = os.path.dirname(fileDir)
publishDir = os.path.join(os.path.dirname(backendDir), "publish")


def copy_backend_to_publish(src, dst):
    for item in os.listdir(src):
        source = os.path.join(src, item)
        destination = os.path.join(dst, item)
        if os.path.isdir(source) and item != "scripts":
            shutil.copytree(source, destination)
        elif os.path.isfile(source):
            shutil.copyfile(source, destination)


def clean_publish():
    for item in os.listdir(publishDir):
        source = os.path.join(publishDir, item)
        if os.path.isdir(source) and item != "build":
            shutil.rmtree(source)
        elif os.path.isfile(source):
            os.remove(source)


clean_publish()
copy_backend_to_publish(backendDir, publishDir)
