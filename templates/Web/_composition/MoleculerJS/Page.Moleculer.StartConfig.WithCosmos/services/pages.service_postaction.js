"use strict";

const SERVICE_ACTIONS = require("./pages.actions");
//{[{
const DBMixin = require("../mixins/db.mixin");
//}]}
module.exports = {
  name: "pages",

  /**
   * Service settings
   * More info: https://moleculer.services/docs/0.13/services.html#Settings
   */
  settings: {
    rest: "/"
  },
//{[{
  
  /**
   * Service Mixin
   * More info: https://moleculer.services/docs/0.13/services.html#Mixins
   * This will extend (current) `pages` service with action handlers and DB methods
   */
  mixins: [SERVICE_ACTIONS, DBMixin()],
//}]}
  /**
   * Service dependencies
   * More info: https://moleculer.services/docs/0.13/services.html#Dependencies
   */
  dependencies: [],
