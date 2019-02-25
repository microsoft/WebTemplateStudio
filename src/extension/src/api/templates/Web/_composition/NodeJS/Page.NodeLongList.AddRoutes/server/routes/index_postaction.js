var constants = require("../constants");

var express = require("express");
var router = express.Router();

//^^
//{[{
var wts.ItemNameItems = [{ text: "Hello 1!", id: 1 }, { text: "Hello 2!", id: 2 }];

router.get(constants.wts.ItemNameendpoint, function(req, res) {
  res.json(wts.ItemNameItems);
});

router.post(constants.wts.ItemNameendpoint, function(req, res) {
  wts.ItemNameItems.unshift({
    text: req.body.text,
    id: req.body.id
  });
  res.json(wts.ItemNameItems);
});

router.delete(constants.wts.ItemNameendpoint + "/:id", function(req, res) {
  const { id } = req.params;
  wts.ItemNameItems = wts.ItemNameItems.filter(wts.ItemNameItems => wts.ItemNameItems.id != id);
  res.send({ id: id, text: "This comments was deleted" });
});
//}]}

module.exports = router;
