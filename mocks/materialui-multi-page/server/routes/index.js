var express = require("express");
var router = express.Router();

var listItems = [{ text: "Hello 1!", id: 1 }, { text: "Hello 2!", id: 2 }];

router.get("/listItems", function(req, res) {
  res.json(listItems);
});

router.post("/listItems", function(req, res) {
  listItems.unshift({
    text: req.body.text,
    id: req.body.id
  });
  res.json(listItems);
});

router.delete("/listItem/:id", function(req, res) {
  const { id } = req.params;
  listItems = listItems.filter(listItem => listItem.id != id);
  res.send({ id: id, text: "This comments was deleted" });
});

module.exports = router;
