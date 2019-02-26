var constants = require("../constants");

var express = require("express");
var router = express.Router();

//{[{
var mongoService = require("../mongo/mongoService");

router.get(constants.wts.ItemNameendpoint, function(req, res) {
  mongoService.get(req, res);
});

router.post(constants.wts.ItemNameendpoint, function(req, res) {
  mongoService.create(req, res);
});

router.delete(constants.wts.ItemNameendpoint + "/:id", function(req, res) {
  mongoService.destroy(req, res);
});
//}]}

module.exports = router;
