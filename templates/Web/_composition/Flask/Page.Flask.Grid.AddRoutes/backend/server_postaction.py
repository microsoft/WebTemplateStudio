from flask import Flask, jsonify, make_response, send_from_directory
import os
from os.path import exists, join

from constants import CONSTANTS
//{[{
from sample_data import sample_data
//}]}

app = Flask(__name__, static_folder='build')

//{[{
# Grid Page Endpoint
@app.route(CONSTANTS['ENDPOINT']['GRID'])
def get_grid():
    return jsonify(sample_data['text_assets'])
//}]}
