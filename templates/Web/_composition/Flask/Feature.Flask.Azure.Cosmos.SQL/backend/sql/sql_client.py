from azure.cosmos import CosmosClient, errors, http_constants, PartitionKey
from .settings import connection_key, master_key
from constants import CONSTANTS

class SQLObj():
    def __init__(self):
        self.client = CosmosClient(
            url = connection_key,
            credential = master_key
        )
        self.db = self.client.create_database_if_not_exists(
            id=CONSTANTS['COSMOS']['DATABASE']
        )
        self.container = self.db.create_container_if_not_exists(
            id=CONSTANTS['COSMOS']['CONTAINER'],
            partition_key=PartitionKey(path="/_partitionKey"),
            offer_throughput=400
        )

    def get_client(self):
        return self.client

    def get_db(self):
        return self.db

    def get_container(self):
        return self.container
