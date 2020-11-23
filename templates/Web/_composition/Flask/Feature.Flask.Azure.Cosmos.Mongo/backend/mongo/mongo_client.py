from pymongo import MongoClient
import sys

import constants

from .settings import connection_str, cosmosDB_user, cosmosDB_password



client = MongoClient(connection_str + '?ssl=true&replicaSet=globaldb')

db = client[constants.COSMOS_COLLECTION]

db.authenticate(cosmosDB_user, cosmosDB_password)

list_items = db.test