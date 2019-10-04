const SERVICE_ACTIONS = {};
SERVICE_ACTIONS.actions = {};

//{[{
// GET list DB
SERVICE_ACTIONS.actions.listGet = {
  rest: "GET /list",
  handler(ctx) {
    // Call find method that was loaded with `db.mixin.js`
    return this._find(ctx, ctx.params);
  }
};

// POST new entry DB
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
  async handler(ctx) {
    try {
      // Call create method that was loaded with `db.mixin.js`
      const item = await this._create(ctx, ctx.params);
      return { _id: item.id, text: item.text };
    } catch (error) {
      throw error;
    }
  }
};

// DELETE an entry DB
SERVICE_ACTIONS.actions.listDelete = {
  rest: "DELETE /list/:_id",
  /**
   * Param validation.
   * More info: https://moleculer.services/docs/0.13/validating.html
   */
  params: {
    _id: { type: "string" }, // required filed
    $$strict: true // no additional properties allowed
  },
  async handler(ctx) {
    try {
      // Call remove method that was loaded with `db.mixin.js`
      const item = await this._remove(ctx, { id: ctx.params._id });
      return { _id: item.id };
    } catch (error) {
      throw error;
    }
  }
};
//}]}

module.exports = SERVICE_ACTIONS;
