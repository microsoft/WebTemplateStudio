"use strict";

const DBService = require("moleculer-db");
const MongoAdapter = require("moleculer-db-adapter-mongo");

module.exports = opt => {
  return {
    mixins: [DBService],
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
    collection: process.env.COSMOSDB_CONNSTR.split("/").pop()
  };
};
