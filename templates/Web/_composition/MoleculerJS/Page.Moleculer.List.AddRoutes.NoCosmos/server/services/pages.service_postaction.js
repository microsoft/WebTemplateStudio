const sampleData = require("../data/sampleData");
//{[{
const { MoleculerError } = require("moleculer").Errors;
//}]}


  /**
   * Service Actions
   * More info: https://moleculer.services/docs/0.14/actions.html
   */
  actions: {
    // Action handlers
  //{[{
    listGet: {
      rest: "GET /list",
      handler(ctx) {
        return sampleData.listTextAssets;
      }
    },
    listPost: {
      rest: "POST /list",
      /**
       * Param validation.
       * More info: https://moleculer.services/docs/0.14/validating.html
       */
      params: {
        text: { type: "string" }, // required field
        $$strict: true // no additional properties allowed
      },
      handler(ctx) {
        let listItem = {
          text: ctx.params.text,
          id: sampleData.listID
        };
    
        sampleData.listTextAssets.unshift(listItem);
        sampleData.listID++;
    
        return listItem;
      }
    },
    listDelete: {
      rest: "DELETE /list/:id",
      /**
       * Param validation.
       * More info: https://moleculer.services/docs/0.14/validating.html
       */
      params: {
        id: { type: "string", integer: true, positive: true, convert: true }, // required filed
        $$strict: true // no additional properties allowed
      },
      handler(ctx) {
        const id = Number(ctx.params.id);
        const index = sampleData.listTextAssets.findIndex(
          listItem => listItem.id === id
        );
    
        if (index === -1) {
          throw new MoleculerError(`Could not find item with id: ${id}`, 404);
        }
    
        sampleData.listTextAssets.splice(index, 1);
        return { id, text: "This commented was deleted" };
      }
    },
  //}]}
  },