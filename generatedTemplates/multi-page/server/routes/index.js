var express = require("express");
var router = express.Router();

let commentId = 3;

let defaultState = {
  commentsList: [
    {
      id: 1,
      text: "First comment on the blog post"
    },
    {
      id: 2,
      text: "Second comment on the blog post"
    }
  ]
};

router.get("/comments", function(req, res, next) {
  res.json(defaultState);
});

router.post("/comments", function(req, res) {
  defaultState.commentsList.unshift({ id: commentId++, text: req.body.text });
  res.json("User added successfully");
});

module.exports = router;
