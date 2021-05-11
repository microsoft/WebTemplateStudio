"use strict";

const DBService = require("moleculer-db");
const CosmosAdapter = require("moleculer-db-adapter-cosmos");

module.exports = opt => {
  return {
    /**
     * Load DB Methods. More info: https://moleculer.services/docs/0.14/moleculer-db.html
     * This will extend `pages` service with DB handlers
     */
    mixins: [DBService],
    // Setup DB Adapter. More info: https://github.com/AndreMaz/moleculer-db-adapter-cosmos
    adapter: new CosmosAdapter(
      {
        endpoint: process.env.COSMOSDB_URI,
        key: process.env.COSMOSDB_PRIMARY_KEY
      },
      "List",
      "ListItems"
    )
  };
};
