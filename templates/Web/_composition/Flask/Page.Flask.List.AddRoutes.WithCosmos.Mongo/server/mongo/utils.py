from bson import ObjectId

def serialize(items):
    for index in items:
        if isinstance(items[index], ObjectId):
            items[index] = str(items[index])
    return items