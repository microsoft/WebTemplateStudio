const sampleData = require("../data/sampleData");
//{[{
const { MoleculerError } = require("moleculer").Errors;
const { v4: uuidv4 } = require('uuid');
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
          id: uuidv4()
        };
    
        sampleData.listTextAssets.unshift(listItem);
    
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
        const id = ctx.params.id;
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