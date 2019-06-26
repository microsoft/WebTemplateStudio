from flask import Flask, send_from_directory
from flask import jsonify
from flask import make_response
//{[{
from flask import request
//}]}
from constants import CONSTANTS
import os
from os.path import exists, join
//{[{
from sample_data import *
//}]}

app = Flask(__name__, static_folder = 'build')

//{[{
# List Endpoints
@app.route(CONSTANTS['ENDPOINT']['LIST'])
def get_list():
    return jsonify(
        sample_data['list_text_assets']['list_items']
    )

@app.route(CONSTANTS['ENDPOINT']['LIST'], methods = ['POST'])
def add_list_item():
    data = request.get_json()
    list_item = {'_id': sample_data['list_text_assets']['list_id'], 'text': data['text']}
    sample_data['list_text_assets']['list_items'].insert(0, list_item)
    sample_data['list_text_assets']['list_id'] += 1
    return make_response(
        jsonify(
            list_item
        ), 201
    )

@app.route(CONSTANTS['ENDPOINT']['LIST'] + '/<int:id>', methods=['DELETE'])
def delete_list_item(id):
    list_items_to_remove = [list_item for list_item in sample_data['list_text_assets']['list_items'] if list_item['_id'] == id]
    if (len(list_items_to_remove) == 0):
        return make_response(jsonify({'error': 'Could not find an item with the given id'}), 404)
    if (len(list_items_to_remove) > 1):
        return make_response(jsonify({'error': 'There is a problem with the server'}), 500)
    sample_data['list_text_assets']['list_items'] = [list_item for list_item in sample_data['list_text_assets']['list_items'] if list_item['_id'] != id]
    return jsonify(
        {'_id': id, 'text': 'This comment was deleted'}
    )
//}]}
