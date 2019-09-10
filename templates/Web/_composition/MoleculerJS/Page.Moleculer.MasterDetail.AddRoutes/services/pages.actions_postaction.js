const SERVICE_ACTIONS = {};
SERVICE_ACTIONS.actions = {};

//{[{
SERVICE_ACTIONS.actions.masterdetail = {
  rest: "GET /masterdetail",
  handler(ctx) {
    return sampleData.textAssets;
  }
};
//}]}

module.exports = SERVICE_ACTIONS;
