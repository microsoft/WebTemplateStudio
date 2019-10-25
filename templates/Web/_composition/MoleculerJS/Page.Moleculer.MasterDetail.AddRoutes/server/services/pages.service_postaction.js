  /**
   * Service Actions
   * More info: https://moleculer.services/docs/0.13/actions.html
   */
  actions: {
    // Action handlers
  //{[{
    masterDetail: {
      rest: "GET /masterdetail",
      handler(ctx) {
        return sampleData.textAssets;
      }
    },
  //}]}
  },