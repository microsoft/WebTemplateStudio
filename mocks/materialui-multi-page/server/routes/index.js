const express = require("express");
const CONSTANTS = require("../constants");
const sampleData = require("../sampleData");

const router = express.Router();

/*
 * Engine: Include this block of code if list and mongo are selected
 */
// var mongoService = require("../mongo/mongoService");

// router.get(CONSTANTS.ENDPOINT.LIST, function(req, res) {
//   mongoService.get(req, res);
// });

// router.post(CONSTANTS.ENDPOINT.LIST, function(req, res) {
//   mongoService.create(req, res);
// });

// router.delete(CONSTANTS.ENDPOINT.LIST + "/:_id", function(req, res) {
//   mongoService.destroy(req, res);
// });

/*
 * Engine: Include this block of code if list and SQL API are selected
 */
const SQLController = require("../sql/sqlController");

const sqlController = new SQLController();

router.get(CONSTANTS.ENDPOINT.LIST, function(req, res) {
  sqlController.get(req, res);
});

router.post(CONSTANTS.ENDPOINT.LIST, function(req, res) {
  sqlController.create(req, res);
});

router.delete(CONSTANTS.ENDPOINT.LIST + "/:_id", function(req, res) {
  sqlController.destroy(req, res);
});

/*
 * Engine: Include the following code if list is selected but Cosmos is not
 */
// List Page Endpoints
// router.get(CONSTANTS.ENDPOINT.LIST, function(req, res) {
//   try {
//     res.json(sampleData.listTextAssets);
//   } catch (err) {
//     console.log(err);
//     res.status(500).send(err);
//   }
// });

// router.post(CONSTANTS.ENDPOINT.LIST, function(req, res) {
//   try {
//     let listItem = {
//       text: req.body.text,
//       _id: sampleData.listID
//     };
//     sampleData.listTextAssets.unshift(listItem);
//     res.json(listItem);
//     sampleData.listID++;
//   } catch (err) {
//     console.log(err);
//     res.status(500).send(err);
//   }
// });

// router.delete(CONSTANTS.ENDPOINT.LIST + "/:_id", function(req, res) {
//   try {
//     const { _id } = req.params;
//     var index = sampleData.listTextAssets.findIndex(
//       listItem => listItem._id === Number(_id)
//     );
//     if (index > -1) {
//       sampleData.listTextAssets.splice(index, 1);
//       res.json({ _id: Number(_id), text: "This commented was deleted" });
//     } else {
//       res.status(404).send("Could not find item with id:" + _id);
//     }
//   } catch (err) {
//     console.log(err);
//     res.status(500).send(err);
//   }
// });

// Grid Page Endpoint
router.get(CONSTANTS.ENDPOINT.GRID, (req, res) => {
  try {
    res.json(sampleData.gridTextAssets);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

// MasterDetail Page Endpoint
router.get(CONSTANTS.ENDPOINT.MASTERDETAIL, (req, res) => {
  try {
    res.json(sampleData.masterDetailTextAssets);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

module.exports = router;
