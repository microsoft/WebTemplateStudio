const mongoose = require("mongoose");
const CONSTANTS = require("../constants");

// TODO Web Template Studio: The Cosmos Mongo Database is set up to hold a collection called ListItems which contains documents
// with the following schema. Define your own schema for the Cosmos MongoDB using mongoose (https://mongoosejs.com/docs/index.html).
const ListItem = mongoose.model(
  CONSTANTS.COSMOS.COLLECTION,
  new mongoose.Schema({
    text: String
  })
);

module.exports = ListItem;
