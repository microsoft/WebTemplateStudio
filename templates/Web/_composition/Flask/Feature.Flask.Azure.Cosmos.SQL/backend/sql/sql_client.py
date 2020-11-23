import azure.cosmos.cosmos_client as cosmos_client
import azure.cosmos.errors as errors
import azure.cosmos.http_constants as http_constants

from .settings import connection_key, master_key

import constants


class SQLObj():
    def __init__(self):
        self.client = cosmos_client.CosmosClient(
            url_connection = connection_key,
            auth = {'masterKey': master_key}
        )

        try:
            self.db = self.client.CreateDatabase(
                {'id': constants.COSMOS_DATABASE}
            ) 
        except errors.HTTPFailure as e:
            if e.status_code == http_constants.StatusCodes.CONFLICT:
                self.db = self.client.ReadDatabase("dbs/" + constants.COSMOS_DATABASE)
            else:
                raise e

        try:
            self.container = self.client.CreateContainer(
                self.db['_self'],
                {
                    'id': constants.COSMOS_CONTAINER
                }, 
                {
                    'offerThroughput': 400
                }
        )
        except errors.HTTPFailure as e:
            if e.status_code == http_constants.StatusCodes.CONFLICT:
                self.container = self.client.ReadContainer("dbs/" + constants.COSMOS_DATABASE + "/colls/" + constants.COSMOS_CONTAINER)
            else:
                raise e

    def get_client(self):
        return self.client

    def get_db(self):
        return self.db

    def get_container(self):
        return self.container