import constants
import mongo.settings
import pymongo

client = pymongo.MongoClient(
    mongo.settings.connection_str + "?ssl=true&replicaSet=globaldb"
)

db = client[constants.COSMOS_COLLECTION]

db.authenticate(mongo.settings.cosmosDB_user, mongo.settings.cosmosDB_password)

list_items = db.test
