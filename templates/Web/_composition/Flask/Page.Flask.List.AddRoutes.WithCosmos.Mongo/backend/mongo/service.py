import bson
import flask
import mongo.client
import mongo.utils


def get():
    items = mongo.client.list_items.find()
    serialized_list_items = [mongo.utils.serialize(item) for item in items]
    return serialized_list_items


def create():
    data = flask.request.get_json()
    list_item = {"text": data["text"]}
    created_item = mongo.client.list_items.insert_one(list_item)
    return {"id": str(created_item.inserted_id), "text": list_item["text"]}


def delete(item_id):
    query_str = {"_id": bson.ObjectId(item_id)}
    result = mongo.client.list_items.delete_one(query_str)
    if result.deleted_count == 0:
        raise ValueError("Could not find an item with given id")
    return {"id": item_id, "text": "This comment was deleted"}
