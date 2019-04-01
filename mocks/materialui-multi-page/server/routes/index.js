const express = require("express");
const CONSTANTS = require("../constants");
const sampleData = require("../sampleData");

const router = express.Router();

/*
 * Engine: Include this block of code if list and mongo are selected
 */
// var mongoService = require("../mongo/mongoService");

// router.get(CONSTANTS.ENDPOINT.LIST, function(req, res, next) {
//   mongoService.get(req, res, next);
// });

// router.post(CONSTANTS.ENDPOINT.LIST, function(req, res, next) {
//   mongoService.create(req, res, next);
// });

// router.delete(CONSTANTS.ENDPOINT.LIST + "/:_id", function(req, res, next) {
//   mongoService.destroy(req, res, next);
// });

/*
 * Engine: Include this block of code if list and SQL API are selected
 */
const SQLController = require("../sql/sqlController");

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

/*
 * Engine: Include the following code if list is selected but Cosmos is not
 */
// List Page Endpoints
// router.get(CONSTANTS.ENDPOINT.LIST, function(req, res) {
//   res.json(sampleData.listTextAssets);
// });

// router.post(CONSTANTS.ENDPOINT.LIST, function(req, res) {
//   let listItem = {
//     text: req.body.text,
//     _id: sampleData.listID
//   };
//   sampleData.listTextAssets.unshift(listItem);
//   res.json(listItem);
//   sampleData.listID++;
// });

// router.delete(CONSTANTS.ENDPOINT.LIST + "/:_id", function(req, res) {
//   const { _id } = req.params;
//   var index = sampleData.listTextAssets.findIndex(
//     listItem => listItem._id === Number(_id)
//   );
//   if (index > -1) {
//     sampleData.listTextAssets.splice(index, 1);
//     res.json({ _id: Number(_id), text: "This commented was deleted" });
//   } else {
//     res.status(404).send("Could not find item with id:" + _id);
//   }
// });

// Grid Page Endpoint
router.get(CONSTANTS.ENDPOINT.GRID, (req, res) => {
  res.json(sampleData.gridTextAssets);
});

// MasterDetail Page Endpoint
router.get(CONSTANTS.ENDPOINT.MASTERDETAIL, (req, res) => {
  res.json(sampleData.masterDetailTextAssets);
});

module.exports = router;
