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
    return make_response(
        jsonify(
            {'_id': str(created_item.inserted_id), 'text': list_item['text']}
        ), 201
    )

def destroy(id):
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
