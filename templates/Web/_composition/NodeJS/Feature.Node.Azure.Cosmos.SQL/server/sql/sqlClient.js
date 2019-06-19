const CosmosClient = require("@azure/cosmos").CosmosClient;
require("dotenv").config();

// Connects the back-end to the Cosmos Core SQL Database (https://docs.microsoft.com/en-us/azure/cosmos-db/create-sql-api-nodejs)
module.exports = class SQLClient {
  constructor(databaseId, containerId) {
    this.client = new CosmosClient({
      endpoint: process.env.COSMOSDB_URI,
      auth: {
        masterKey: process.env.COSMOSDB_PRIMARY_KEY
      }
    });

    this.databaseId = databaseId;
    this.containerId = containerId;

    this.database = null;
    this.container = null;
  }

  async connect() {
    const dbResponse = await this.client.databases.createIfNotExists({
      id: this.databaseId
    });
    this.database = dbResponse.database;

    const containerResponse = await this.database.containers.createIfNotExists({
      id: this.containerId
    });
    this.container = containerResponse.container;
  }
};
