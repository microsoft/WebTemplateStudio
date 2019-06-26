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
from mongo.mongo_client import *
from bson import json_util, ObjectId
import json
from mongo.settings import *
from mongo.utils import serialize
//}]}

app = Flask(__name__, static_folder = 'build')

//{[{
# List Endpoints
@app.route(CONSTANTS['ENDPOINT']['LIST'])
def get_list():
    items = list_items.find()
    serialized_list_items = [serialize(item) for item in items]
    return jsonify(serialized_list_items)

@app.route(CONSTANTS['ENDPOINT']['LIST'], methods=['POST'])
def add_list_item():
    data = request.get_json()
    list_item = {'text': data['text']}
    created_item = list_items.insert_one(list_item)
    return make_response(
        jsonify(
            {'_id': str(created_item.inserted_id), 'text': list_item['text']}
        ), 201
    )

@app.route(CONSTANTS['ENDPOINT']['LIST'] + '/<id>', methods=['DELETE'])
def delete_list_item(id):
    query_str = {'_id': ObjectId(id)}
    count = 0
    result = list_items.find(query_str)
    for item in iter(result):
        count += 1
    if count == 0:
        return make_response(
            jsonify(
                {'error': 'Could not find an item with given id'}
            ),
            404
        )
    list_items.delete_one(query_str)
    return jsonify(
        {'_id': id, 'text': 'This comment was deleted'}
    )

//}]}
