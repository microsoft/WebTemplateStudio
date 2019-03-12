﻿const ListItem = require("./mongoModel");
const ReadPreference = require("mongodb").ReadPreference;

require("./mongoConnect").connect();

// Find all list items from the nearest instance of the database
function get(req, res) {
  const docquery = ListItem.find({}).read(ReadPreference.NEAREST);
  docquery
    .exec()
    .then(listItems => {
      res.json(listItems);
    })
    .catch(err => {
      res.status(500).send(err);
    });
}

// Post a new listItem to the ListItem collection in Cosmos MongoDB
function create(req, res) {
  const listItem = new ListItem({ text: req.body.text });
  listItem
    .save()
    .then(() => {
      res.json(listItem);
    })
    .catch(err => {
      res.status(500).send(err);
    });
}

// Remove a listItem from the ListItem collection in Cosmos MongoDB
function destroy(req, res) {
  const { _id } = req.params;

  ListItem.findByIdAndDelete(_id)
    .then(listItem => {
      res.json(listItem);
    })
    .catch(err => {
      res.status(500).send(err);
    });
}

module.exports = { get, create, destroy };
