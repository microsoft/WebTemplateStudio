from flask import Flask, send_from_directory
from flask import jsonify
from flask import make_response
from constants import CONSTANTS
import os
from os.path import exists, join
//{[{
from sampleData import *
//}]}

app = Flask(__name__, static_folder = 'build')

//{[{
# MasterDetail Page Endpoint
@app.route(CONSTANTS['ENDPOINT']['MASTERDETAIL'])
def getMasterDetail():
    return jsonify(
        sampleData['textAssets']
    )
//}]}
