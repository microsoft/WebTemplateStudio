const mongoose = require("mongoose");

const Comment = mongoose.model(
  "Comments",
  new mongoose.Schema({
    text: String
  })
);

module.exports = Comment;
