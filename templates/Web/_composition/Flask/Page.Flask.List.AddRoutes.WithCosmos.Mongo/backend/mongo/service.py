import flask
import bson
from . import client
from . import utils


def get():
    items = client.list_items.find()
    serialized_list_items = [utils.serialize(item) for item in items]
    return serialized_list_items

def create():
    data = flask.request.get_json()
    list_item = {'text': data['text']}
    created_item = client.list_items.insert_one(list_item)
    return {'id': str(created_item.inserted_id), 'text': list_item['text']}

def delete(id):
    query_str = {'_id': bson.ObjectId(id)}
    result = client.list_items.delete_one(query_str)
    if result.deleted_count == 0:
        raise Exception('Could not find an item with given id')
    return {'id': id, 'text': 'This comment was deleted'}
