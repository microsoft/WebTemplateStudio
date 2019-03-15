var constants = require("../constants");

var express = require("express");
var router = express.Router();

//^^
//{[{
var wts.ItemNameItems = [
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

router.get(constants.wts.ItemNameendpoint, function(req, res) {
  try {
    res.json(wts.ItemNameItems);
  } catch (err) {
    res.status.send(500).send(err);
  }
});

router.post(constants.wts.ItemNameendpoint, function(req, res) {
  try {
    let wts.ItemNameItem = {
      text: req.body.text,
      _id: req.body._id
    };
    wts.ItemNameItems.unshift(wts.ItemNameItem);
    res.json(wts.ItemNameItems);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.delete(constants.wts.ItemNameendpoint + "/:_id", function(req, res) {
  try {
    const { _id } = req.params;
    var index = wts.ItemNameItems.findIndex(item => item._id == _id);
    if (index > -1) {
      wts.ItemNameItems.splice(index, 1);
      res.json({ _id: Number(_id), text: "This commented was deleted" });
    } else {
      res.status(404).send("Could not find item with id:" + _id);
    }
  } catch (err) {
    res.status(500).send(err);
  }
});
//}]}

module.exports = router;
