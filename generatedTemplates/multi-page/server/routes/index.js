var express = require("express");
var router = express.Router();
var commentService = require("../comment-service");

router.get("/comments", function(req, res, next) {
  commentService.get(req, res);
});

router.post("/comments", function(req, res) {
  commentService.create(req, res);
});

module.exports = router;
