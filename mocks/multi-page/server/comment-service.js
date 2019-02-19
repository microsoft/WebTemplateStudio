const Comment = require("./comment-model");
const ReadPreference = require("mongodb").ReadPreference;

require("./mongo").connect();

// Find all comments from the nearest instance of the database
function get(req, res) {
  const docquery = Comment.find({}).read(ReadPreference.NEAREST);
  docquery
    .exec()
    .then(comments => {
      res.json(comments);
    })
    .catch(err => {
      res.status(500).send(err);
    });
}

// Post a new comment to the Comments collection in Cosmos MongoDB
function create(req, res) {
  console.log(req.body);
  const comment = new Comment({ text: req.body.text });
  comment
    .save()
    .then(() => {
      res.json(comment);
    })
    .catch(err => {
      res.status(500).send(err);
    });
}

module.exports = { get, create };
