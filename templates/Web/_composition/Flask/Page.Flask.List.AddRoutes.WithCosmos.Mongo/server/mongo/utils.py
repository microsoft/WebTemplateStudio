from bson import ObjectId

def serialize(items):
    listItem = {"id": "", "text": items["text"]}
    for index in items:
        if isinstance(items[index], ObjectId):
            listItem["id"] = str(items[index])
    return listItem