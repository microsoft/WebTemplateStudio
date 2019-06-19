import azure.cosmos.cosmos_client as cosmos_client
from sql.constants import CONSTANTS
from .settings import *


class SQLObj():
    def __init__(self):
        self.client = cosmos_client.CosmosClient(
            url_connection=connection_key, auth={'masterKey': master_key})
        self.db = self.client.CreateDatabase(
            {'id': CONSTANTS['COSMOS']['DATABASE']})
        self.container = self.client.CreateContainer(self.db['_self'], {
                                                     'id': CONSTANTS['COSMOS']['CONTAINER']}, {'offerThroughput': 400})

    def getClient(self):
        return self.client

    def getDb(self):
        return self.db

    def getContainer(self):
        return self.container