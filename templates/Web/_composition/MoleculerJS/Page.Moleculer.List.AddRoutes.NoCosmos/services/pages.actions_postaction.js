const sampleData = require("../data/sampleData");
//{[{
const { MoleculerError } = require("moleculer").Errors;
//}]}

const SERVICE_ACTIONS = {};
SERVICE_ACTIONS.actions = {};

//{[{
// GET list
SERVICE_ACTIONS.actions.listGet = {
  rest: "GET /list",
  handler(ctx) {
    return sampleData.listTextAssets;
  }
};

// POST new entry
SERVICE_ACTIONS.actions.listPost = {
  rest: "POST /list",
  /**
   * Param validation.
   * More info: https://moleculer.services/docs/0.13/validating.html
   */
  params: {
    text: { type: "string" }, // required field
    $$strict: true // no additional properties allowed
  },
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
SERVICE_ACTIONS.actions.listDelete = {
  rest: "DELETE /list/:_id",
  /**
   * Param validation.
   * More info: https://moleculer.services/docs/0.13/validating.html
   */
  params: {
    _id: { type: "string", integer: true, positive: true, convert: true }, // required filed
    $$strict: true // no additional properties allowed
  },
  handler(ctx) {
    const _id = Number(ctx.params._id);
    const index = sampleData.listTextAssets.findIndex(
      listItem => listItem._id === _id
    );

    if (index === -1) {
      throw new MoleculerError(`Could not find item with id: ${_id}`, 404);
    }

    sampleData.listTextAssets.splice(index, 1);
    return { _id, text: "This commented was deleted" };
  }
};
//}]}

module.exports = SERVICE_ACTIONS;
