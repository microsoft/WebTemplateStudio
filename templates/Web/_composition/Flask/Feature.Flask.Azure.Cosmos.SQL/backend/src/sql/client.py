import azure.cosmos
import src.sql.settings

COSMOS_DATABASE = "List"
COSMOS_CONTAINER = "ListItems"


class SQLObj:
    def __init__(self):
        self.client = azure.cosmos.CosmosClient(
            url=src.sql.settings.connection_key, credential=src.sql.settings.master_key
        )
        self.database = self.client.create_database_if_not_exists(id=COSMOS_DATABASE)
        self.container = self.database.create_container_if_not_exists(
            id=COSMOS_CONTAINER,
            partition_key=azure.cosmos.PartitionKey(path="/_partitionKey"),
            offer_throughput=400,
        )

    def get_client(self):
        return self.client

    def get_db(self):
        return self.database

    def get_container(self):
        return self.container
