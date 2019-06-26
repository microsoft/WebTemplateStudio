from flask import Flask, send_from_directory
from flask import jsonify
from flask import make_response
from constants import CONSTANTS
import os
from os.path import exists, join
//{[{
from sample_data import *
//}]}

app = Flask(__name__, static_folder = 'build')

//{[{
# Grid Page Endpoint
@app.route(CONSTANTS['ENDPOINT']['GRID'])
def get_grid():
    return jsonify(
        sample_data['text_assets']
    )
//}]}
