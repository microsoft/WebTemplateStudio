import azure.cosmos
import constants
import sql.settings


class SQLObj:
    def __init__(self):
        self.client = azure.cosmos.CosmosClient(
            url=sql.settings.connection_key, credential=sql.settings.master_key
        )
        self.database = self.client.create_database_if_not_exists(
            id=constants.COSMOS_DATABASE
        )
        self.container = self.database.create_container_if_not_exists(
            id=constants.COSMOS_CONTAINER,
            partition_key=azure.cosmos.PartitionKey(path="/_partitionKey"),
            offer_throughput=400,
        )

    def get_client(self):
        return self.client

    def get_db(self):
        return self.database

    def get_container(self):
        return self.container
