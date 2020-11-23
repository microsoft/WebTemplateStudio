from flask import Flask, jsonify, make_response, send_from_directory
import os
from os.path import exists, join

import constants
//{[{
from sample_data import sample_data
//}]}

app = Flask(__name__, static_folder='build')

//{[{
# Grid Page Endpoint
@app.route(constants.ENDPOINT_GRID)
def get_grid():
    return jsonify(sample_data['text_assets'])
//}]}
