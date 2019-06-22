from flask import Flask
from flask import jsonify
from flask import make_response
from constants import CONSTANTS
//{[{
from sampleData import *
//}]}

app = Flask(__name__)

//{[{
# MasterDetail Page Endpoint
@app.route(CONSTANTS['ENDPOINT']['MASTER_DETAIL'])
def get_msater_detail():
    return jsonify(
        sampleData['text_assets']
    )
//}]}
