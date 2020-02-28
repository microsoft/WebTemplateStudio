"use strict";

const DBService = require("moleculer-db");
const MongoAdapter = require("moleculer-db-adapter-mongo");

module.exports = opt => {
  return {
    /**
     * Load DB Methods. More info: https://moleculer.services/docs/0.14/moleculer-db.html
     * This will extend `pages` service with DB handlers
     */
    mixins: [DBService],
    // Setup DB Adapter. More info: https://moleculer.services/docs/0.14/moleculer-db.html#Mongo-Adapter
    adapter: new MongoAdapter(
      `${process.env.COSMOSDB_CONNSTR}?ssl=true&replicaSet=globaldb`,
      {
        auth: {
          user: process.env.COSMOSDB_USER,
          password: process.env.COSMOSDB_PASSWORD
        },
        useNewUrlParser: true,
        useUnifiedTopology: true
      }
    ),
    // Set DB collection name
    collection: process.env.COSMOSDB_CONNSTR.split("/").pop()
  };
};
