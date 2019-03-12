﻿const mongoose = require("mongoose");

// Define a schema for the Cosmos Mongo Database (https://mongoosejs.com/docs/index.html)
const ListItem = mongoose.model(
  "ListItems",
  new mongoose.Schema({
    text: String
  })
);

module.exports = ListItem;
