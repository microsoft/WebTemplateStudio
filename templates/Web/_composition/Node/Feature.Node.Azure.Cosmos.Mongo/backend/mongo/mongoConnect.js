const mongoose = require("mongoose");
require("dotenv").config();

mongoose.Promise = global.Promise;

// Connects the back end to the Cosmos Mongo Database (https://docs.microsoft.com/en-us/azure/cosmos-db/mongodb-mongoose)
function connect() {
  mongoose
    .connect(`${process.env.COSMOSDB_CONNSTR}?ssl=true&replicaSet=globaldb`, {
      auth: {
        user: process.env.COSMOSDB_USER,
        password: process.env.COSMOSDB_PASSWORD
      },
      useNewUrlParser: true
    })
    .then(() => console.log("Connection to CosmosDB successful"))
    .catch(err => console.error(err));
}

module.exports = { connect, mongoose };
