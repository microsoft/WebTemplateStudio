import mongo.settings
import pymongo

COSMOS_COLLECTION = "ListItems"

client = pymongo.MongoClient(
    mongo.settings.connection_str + "?ssl=true&replicaSet=globaldb"
)

db = client[COSMOS_COLLECTION]

db.authenticate(mongo.settings.cosmosDB_user, mongo.settings.cosmosDB_password)

list_items = db.test
