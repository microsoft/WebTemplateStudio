const mongoose = require("mongoose");

// Define a schema for the Cosmos MongoDB (https://mongoosejs.com/docs/index.html)
// TODO WTS: Define a schema for real data
const ListItem = mongoose.model(
  "ListItems",
  new mongoose.Schema({
    text: String
  })
);

module.exports = ListItem;
