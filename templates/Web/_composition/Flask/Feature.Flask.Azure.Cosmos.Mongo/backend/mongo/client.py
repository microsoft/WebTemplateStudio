import pymongo
import constants
from . import settings

client = pymongo.MongoClient(settings.connection_str + "?ssl=true&replicaSet=globaldb")

db = client[constants.COSMOS_COLLECTION]

db.authenticate(settings.cosmosDB_user, settings.cosmosDB_password)

list_items = db.test
