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
# Grid Page Endpoint
@app.route(CONSTANTS['ENDPOINT']['GRID'])
def getGrid():
    return jsonify(
        sampleData['textAssets']
    )
//}]}
