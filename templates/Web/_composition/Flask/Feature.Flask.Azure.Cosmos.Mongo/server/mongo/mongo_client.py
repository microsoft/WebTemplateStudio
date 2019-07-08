from pymongo import MongoClient
import sys

from constants import CONSTANTS

from .settings import connection_str, cosmosDB_user, cosmosDB_password



client = MongoClient(connection_str + '?ssl=true&replicaSet=globaldb')

db = client[CONSTANTS['COSMOS']['COLLECTION']]

db.authenticate(cosmosDB_user, cosmosDB_password)

list_items = db.test