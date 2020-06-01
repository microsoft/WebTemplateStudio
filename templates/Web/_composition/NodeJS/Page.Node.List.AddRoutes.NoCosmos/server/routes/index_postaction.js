//{[{
const CONSTANTS = require("../constants");
//}]}
const express = require("express");
//{[{
const sampleData = require("../sampleData");
//}]}

const router = express.Router();
//{[{
// LIST ENDPOINTS
router.get(CONSTANTS.ENDPOINT.LIST, function(req, res) {
  res.json(sampleData.listTextAssets);
});

router.post(CONSTANTS.ENDPOINT.LIST, function(req, res) {
  let listItem = {
    text: req.body.text,
    id: sampleData.listID
  };
  sampleData.listTextAssets.unshift(listItem);
  res.json(listItem);
  sampleData.listID++;
});

router.delete(CONSTANTS.ENDPOINT.LIST + "/:id", function(req, res) {
  const { id } = req.params;
  var index = sampleData.listTextAssets.findIndex(
    listItem => listItem.id === Number(id)
  );
  if (index > -1) {
    sampleData.listTextAssets.splice(index, 1);
    res.json({ id: Number(id), text: "This commented was deleted" });
  } else {
    res.status(404).send("Could not find item with id:" + id);
  }
});
//}]}

module.exports = router;
