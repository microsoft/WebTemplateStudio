from flask import jsonify, make_response, request
from .mongo_client import *
from bson import json_util, ObjectId
import json
from .settings import *
from .utils import serialize


def get():
    items = list_items.find()
    serialized_list_items = [serialize(item) for item in items]
    return jsonify(serialized_list_items)

def create():
    data = request.get_json()
    list_item = {'text': data['text']}
    created_item = list_items.insert_one(list_item)
    json_response = jsonify({'_id': str(created_item.inserted_id), 'text': list_item['text']})
    return make_response(json_response, 201)

def destroy(id):
    query_str = {'_id': ObjectId(id)}
    result = list_items.delete_one(query_str)
    if result.deleted_count == 0:
        json_response = jsonify({'error': 'Could not find an item with given id'})
        return make_response(json_response, 404)
    return jsonify({'_id': id, 'text': 'This comment was deleted'})
