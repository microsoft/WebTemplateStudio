//{[{
const CONSTANTS = require("../constants");
//}]}
const express = require("express");
//{[{
const sampleData = require("../sampleData");
//}]}

const router = express.Router();
//{[{
// MasterDetail Page Endpoint
router.get(CONSTANTS.ENDPOINT.MASTERDETAIL, (req, res) => {
  res.json(sampleData.textAssets);
});
//}]}

module.exports = router;
