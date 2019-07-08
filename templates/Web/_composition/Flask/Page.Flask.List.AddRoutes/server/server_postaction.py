from flask import Flask, jsonify, make_response, send_from_directory
//{[{
from flask import request
//}]}
import os
from os.path import exists, join

from constants import CONSTANTS
//{[{
from sample_data import sample_data
//}]}

app = Flask(__name__, static_folder='build')

//{[{
# List Endpoints
@app.route(CONSTANTS['ENDPOINT']['LIST'])
def get_list():
    return jsonify(sample_data['list_text_assets']['list_items'])

@app.route(CONSTANTS['ENDPOINT']['LIST'], methods = ['POST'])
def add_list_item():
    data = request.get_json()
    list_item = {'_id': sample_data['list_text_assets']['list_id'], 'text': data['text']}
    sample_data['list_text_assets']['list_items'].insert(0, list_item)
    sample_data['list_text_assets']['list_id'] += 1
    json_response = jsonify(list_item)
    return make_response(json_response, CONSTANTS['HTTP_STATUS']['201_CREATED'])

@app.route(CONSTANTS['ENDPOINT']['LIST'] + '/<int:id>', methods=['DELETE'])
def delete_list_item(id):
    list_items_to_remove = [list_item for list_item in sample_data['list_text_assets']['list_items'] if list_item['_id'] == id]
    if not list_items_to_remove:
        json_response = jsonify({'error': 'Could not find an item with the given id'})
        return make_response(json_response, CONSTANTS['HTTP_STATUS']['404_NOT_FOUND'])
    if len(list_items_to_remove) > 1:
        json_response = jsonify({'error': 'More than one list items found with the same id'})
        return make_response(json_response, CONSTANTS['HTTP_STATUS']['500_INTERNAL_SERVER_ERROR'])
    sample_data['list_text_assets']['list_items'] = [list_item for list_item in sample_data['list_text_assets']['list_items'] if list_item['_id'] != id]
    return jsonify({'_id': id, 'text': 'This comment was deleted'})
//}]}
