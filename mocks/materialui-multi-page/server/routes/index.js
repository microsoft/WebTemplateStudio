var constants = require("../constants");
var express = require("express");
var router = express.Router();

/*
 * Include this block of code if list and mongo are selected
 */
// var mongoService = require("../mongo/mongoService");

// router.get(constants.endpoint, function(req, res) {
//   mongoService.get(req, res);
// });

// router.post(constants.endpoint, function(req, res) {
//   mongoService.create(req, res);
// });

// router.delete(constants.endpoint + "/:_id", function(req, res) {
//   mongoService.destroy(req, res);
// });

/*
 * Include the following code if list is selected but Cosmos is not
 */
var listItems = [
  {
    text:
      "Lorem id sint aliqua tempor tempor sit. Ad dolor dolor ut nulla mollit dolore non eiusmod Lorem tempor nisi cillum minim. Dolore fugiat consectetur laborum laboris labore sit veniam deserunt id dolor laboris ad veniam.",
    _id: 1
  },
  {
    text:
      "Lorem id sint aliqua tempor tempor sit. Ad dolor dolor ut nulla mollit dolore non eiusmod Lorem tempor nisi cillum minim. Dolore fugiat consectetur laborum laboris labore sit veniam deserunt id dolor laboris ad veniam.",
    _id: 2
  }
];

router.get(constants.endpoint, function(req, res) {
  res.json(listItems);
});

router.post(constants.endpoint, function(req, res) {
  let listItem = {
    text: req.body.text,
    _id: req.body._id
  };
  listItems.unshift(listItem);
  res.json(listItem);
});

router.delete(constants.endpoint + "/:_id", function(req, res) {
  const { _id } = req.params;
  listItems = listItems.filter(listItem => listItem._id !== _id);
  res.json({ _id: Number(_id), text: "This commented was deleted" });
});

module.exports = router;
