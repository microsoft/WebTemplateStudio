  /**
   * Service Actions
   * More info: https://moleculer.services/docs/0.14/actions.html
   */
  actions: {
    // Action handlers
  //{[{
    grid: {
      rest: "GET /grid",
      handler(ctx) {
        return sampleData.textAssets;
      }
    },
  //}]}
  },