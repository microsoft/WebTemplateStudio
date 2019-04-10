//{[{
const CONSTANTS = require("../constants");
//}]}
const express = require("express");
//{[{
const SQLController = require("../sql/sqlController");
//}]}
const router = express.Router();

//{[{
//List Items
const sqlController = new SQLController();

router.get(CONSTANTS.ENDPOINT.LIST, function(req, res, next) {
  sqlController.get(req, res, next);
});

router.post(CONSTANTS.ENDPOINT.LIST, function(req, res, next) {
  sqlController.create(req, res, next);
});

router.delete(CONSTANTS.ENDPOINT.LIST + "/:_id", function(req, res, next) {
  sqlController.destroy(req, res, next);
});
//}]}

module.exports = router;
