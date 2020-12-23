import pymongo
import src.mongo.settings

COSMOS_COLLECTION = "ListItems"

client = pymongo.MongoClient(
    src.mongo.settings.connection_str + "?ssl=true&replicaSet=globaldb"
)

db = client[COSMOS_COLLECTION]

db.authenticate(src.mongo.settings.cosmosDB_user, src.mongo.settings.cosmosDB_password)

list_items = db.test
