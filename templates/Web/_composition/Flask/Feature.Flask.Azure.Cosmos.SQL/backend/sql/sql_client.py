import azure.cosmos.cosmos_client as cosmos_client
import azure.cosmos.errors as errors
import azure.cosmos.http_constants as http_constants

from .settings import connection_key, master_key

from constants import CONSTANTS


class SQLObj():
    def __init__(self):
        self.client = cosmos_client.CosmosClient(
            url_connection = connection_key,
            auth = {'masterKey': master_key}
        )

        try:
            self.db = self.client.CreateDatabase(
                {'id': CONSTANTS['COSMOS']['DATABASE']}
            ) 
        except errors.HTTPFailure as e:
            if e.status_code == http_constants.StatusCodes.CONFLICT:
                self.db = self.client.ReadDatabase("dbs/" + CONSTANTS['COSMOS']['DATABASE'])
            else:
                raise e

        try:
            self.container = self.client.CreateContainer(
                self.db['_self'],
                {
                    'id': CONSTANTS['COSMOS']['CONTAINER']
                }, 
                {
                    'offerThroughput': 400
                }
        )
        except errors.HTTPFailure as e:
            if e.status_code == http_constants.StatusCodes.CONFLICT:
                self.container = self.client.ReadContainer("dbs/" + CONSTANTS['COSMOS']['DATABASE'] + "/colls/" + CONSTANTS['COSMOS']['CONTAINER'])
            else:
                raise e

    def get_client(self):
        return self.client

    def get_db(self):
        return self.db

    def get_container(self):
        return self.container