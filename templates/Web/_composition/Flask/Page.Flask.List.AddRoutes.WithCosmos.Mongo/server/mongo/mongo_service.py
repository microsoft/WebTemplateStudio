from flask import request
from bson import ObjectId

from .mongo_client import list_items
from .utils import serialize


def get():
    items = list_items.find()
    serialized_list_items = [serialize(item) for item in items]
    return serialized_list_items

def create():
    data = request.get_json()
    list_item = {'text': data['text']}
    created_item = list_items.insert_one(list_item)
    return {'id': str(created_item.inserted_id), 'text': list_item['text']}

def delete(id):
    query_str = {'_id': ObjectId(id)}
    result = list_items.delete_one(query_str)
    if result.deleted_count == 0:
        raise Exception('Could not find an item with given id')
    return {'id': id, 'text': 'This comment was deleted'}
