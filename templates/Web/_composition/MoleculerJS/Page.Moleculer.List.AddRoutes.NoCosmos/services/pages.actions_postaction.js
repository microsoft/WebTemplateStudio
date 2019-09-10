const sampleData = require("../data/sampleData");
//{[{
const { MoleculerError } = require("moleculer").Errors;
//}]}

const SERVICE_ACTIONS = {};
SERVICE_ACTIONS.actions = {};

//{[{
// GET list
SERVICE_ACTIONS.actions.get = {
  rest: "GET /list",
  handler(ctx) {
    return sampleData.listTextAssets;
  }
};

// POST new entry
SERVICE_ACTIONS.actions.post = {
  rest: "POST /list",
  handler(ctx) {
    let listItem = {
      text: ctx.params.text,
      _id: sampleData.listID
    };

    sampleData.listTextAssets.unshift(listItem);
    sampleData.listID++;

    return listItem;
  }
};

// DELETE an entry
SERVICE_ACTIONS.actions.delete = {
  rest: "DELETE /list/:_id",
  handler(ctx) {
    const { _id } = ctx.params;
    const index = sampleData.listTextAssets.findIndex(
      listItem => listItem._id === Number(_id)
    );

    if (index > -1) {
      sampleData.listTextAssets.splice(index, 1);
      return { _id: Number(_id), text: "This commented was deleted" };
    } else {
      return new MoleculerError(`Could not find item with id: ${_id}`, 404);
    }
  }
};
//}]}

module.exports = SERVICE_ACTIONS;
