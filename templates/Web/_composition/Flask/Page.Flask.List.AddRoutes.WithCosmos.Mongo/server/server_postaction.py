from flask import Flask, jsonify, make_response, send_from_directory
import os
from os.path import exists, join

//{[{
from mongo.mongo_service import *
//}]}

from constants import CONSTANTS


app = Flask(__name__, static_folder='build')

//{[{
# List Endpoints
@app.route(CONSTANTS['ENDPOINT']['LIST'])
def get_list():
    return get()

@app.route(CONSTANTS['ENDPOINT']['LIST'], methods=['POST'])
def add_list_item():
    return create()

@app.route(CONSTANTS['ENDPOINT']['LIST'] + '/<id>', methods=['DELETE'])
def delete_list_item(id):
    return destroy(id)

//}]}
