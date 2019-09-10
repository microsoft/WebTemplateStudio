const SERVICE_ACTIONS = {};
SERVICE_ACTIONS.actions = {};

//{[{
SERVICE_ACTIONS.actions.grid = {
  rest: "GET /grid",
  handler(ctx) {
    return sampleData.textAssets;
  }
};
//}]}

module.exports = SERVICE_ACTIONS;
