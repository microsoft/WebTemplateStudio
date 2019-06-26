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
# MasterDetail Page Endpoint
@app.route(CONSTANTS['ENDPOINT']['MASTER_DETAIL'])
def get_master_detail():
    return jsonify(
        sample_data['text_assets']
    )
//}]}
