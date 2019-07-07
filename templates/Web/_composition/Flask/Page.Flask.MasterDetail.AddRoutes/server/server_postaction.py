from flask import Flask, jsonify, make_response, send_from_directory
import os
from os.path import exists, join

from constants import CONSTANTS
//{[{
from sample_data import sample_data
//}]}

app = Flask(__name__, static_folder='build')

//{[{
# MasterDetail Page Endpoint
@app.route(CONSTANTS['ENDPOINT']['MASTER_DETAIL'])
def get_master_detail():
    return jsonify(sample_data['text_assets'])
//}]}
