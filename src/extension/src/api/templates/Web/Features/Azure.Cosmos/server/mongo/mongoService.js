const ReadPreference = require("mongodb").ReadPreference;
const ListItem = require("./mongoModel");

require("./mongoConnect").connect();

// Find all list items from the nearest instance of Cosmos MongoDB
function get(req, res, next) {
  const docquery = ListItem.find({})
    .sort({ _id: -1 })
    .read(ReadPreference.NEAREST);
  docquery
    .exec()
    .then(listItems => {
      res.json(listItems);
    })
    .catch(next);
}

// Post a new listItem to the ListItem collection in Cosmos MongoDB
function create(req, res, next) {
  const listItem = new ListItem({ text: req.body.text });
  listItem
    .save()
    .then(() => {
      res.json(listItem);
    })
    .catch(next);
}

// Remove a listItem from the ListItem collection in Cosmos MongoDB
function destroy(req, res, next) {
  const { _id } = req.params;

  ListItem.findByIdAndDelete(_id)
    .then(listItem => {
      res.json(listItem);
    })
    .catch(next);
}

module.exports = { get, create, destroy };
