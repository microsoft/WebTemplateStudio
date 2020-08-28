//{[{
const CONSTANTS = require("../constants");
//}]}
const express = require("express");
//{[{
const sampleData = require("../sampleData");
//}]}

const router = express.Router();
//{[{
// Grid Page Endpoint
router.get(CONSTANTS.ENDPOINT.GRID, (req, res) => {
  res.json(sampleData.textAssets);
});
//}]}

module.exports = router;
