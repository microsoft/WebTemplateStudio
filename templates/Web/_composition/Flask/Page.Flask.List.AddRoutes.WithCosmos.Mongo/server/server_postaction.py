from flask import Flask, jsonify, make_response, send_from_directory
import os
from os.path import exists, join

//{[{
from mongo.mongo_service import get, create, destroy
//}]}
from constants import CONSTANTS


app = Flask(__name__, static_folder='build')

//{[{
# List Endpoints
@app.route(CONSTANTS['ENDPOINT']['LIST'])
def get_list():
    return jsonify(get())

@app.route(CONSTANTS['ENDPOINT']['LIST'], methods=['POST'])
def add_list_item():
    json_response = jsonify(create())
    return make_response(json_response, 201)

@app.route(CONSTANTS['ENDPOINT']['LIST'] + '/<id>', methods=['DELETE'])
def delete_list_item(id):
    try:
        removed_item = jsonify(destroy(id))
        return removed_item
    except Exception as ex:
        err_response = jsonify({'error': str(ex)})
        return make_response(err_response, 404)
//}]}
