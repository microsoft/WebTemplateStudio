const mongoose = require("mongoose");
const env = require("./env/env");

mongoose.Promise = global.Promise;

function connect() {
  mongoose
    .connect(env.COSMOSDB_CONNSTR + "?ssl=true&replicaSet=globaldb", {
      auth: {
        user: env.COSMOSDB_USER,
        password: env.COSMOSDB_PASSWORD
      }
    })
    .then(() => console.log("Connection to CosmosDB successful"))
    .catch(err => console.error(err));
}

module.exports = { connect, mongoose };
