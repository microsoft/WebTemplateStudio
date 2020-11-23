from flask import Flask, jsonify, make_response, send_from_directory
//{[{
import uuid
//}]}
//{[{
from flask import request
//}]}
import os
from os.path import exists, join

import constants
//{[{
from sample_data import sample_data
//}]}

app = Flask(__name__, static_folder='build')

//{[{
# List Endpoints
@app.route(constants.ENDPOINT_LIST)
def get_list():
    return jsonify(sample_data['list_text_assets'])

@app.route(constants.ENDPOINT_LIST, methods = ['POST'])
def add_list_item():
    data = request.get_json()
    list_item = {'id':  str(uuid.uuid4()), 'text': data['text']}
    sample_data['list_text_assets'].insert(0, list_item)
    json_response = jsonify(list_item)
    return make_response(json_response, constants.HTTP_STATUS_201_CREATED)

@app.route(constants.ENDPOINT_LIST + '/<string:id>', methods=['DELETE'])
def delete_list_item(id):
    item_to_remove = next((item for item in sample_data['list_text_assets'] if item["id"] == id), None)
    if item_to_remove is None:
        json_response = jsonify({'error': 'Could not find an item with the given id'})
        return make_response(json_response, constants.HTTP_STATUS_404_NOT_FOUND)
    sample_data['list_text_assets'].remove(item_to_remove)
    return jsonify({'id': id, 'text': 'This comment was deleted'})
//}]}
