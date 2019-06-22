from flask import Flask
from flask import jsonify
from flask import make_response
from constants import CONSTANTS
//{[{
from sampleData import *
//}]}

app = Flask(__name__)

//{[{
# Grid Page Endpoint
@app.route(CONSTANTS['ENDPOINT']['GRID'])
def get_grid():
    return jsonify(
        sampleData['text_assets']
    )
//}]}
