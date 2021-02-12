import pymongo
import Param_ProjectName_Snake.mongo.settings

COSMOS_COLLECTION = "ListItems"

client = pymongo.MongoClient(
    Param_ProjectName_Snake.mongo.settings.connection_str + "?ssl=true&replicaSet=globaldb"
)

db = client[COSMOS_COLLECTION]

db.authenticate(Param_ProjectName_Snake.mongo.settings.cosmosDB_user, Param_ProjectName_Snake.mongo.settings.cosmosDB_password)

list_items = db.test
