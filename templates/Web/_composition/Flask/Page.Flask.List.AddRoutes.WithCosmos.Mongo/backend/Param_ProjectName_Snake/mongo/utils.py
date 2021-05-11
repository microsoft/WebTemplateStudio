import bson


def serialize(items):
    list_item = {"id": "", "text": items["text"]}
    for index in items:
        if isinstance(items[index], bson.ObjectId):
            list_item["id"] = str(items[index])
    return list_item
