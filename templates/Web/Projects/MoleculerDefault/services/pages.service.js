"use strict";

const SERVICE_ACTIONS = require("./pages.actions");

module.exports = {
  name: "pages",

  /**
   * Service settings
   * More info: https://moleculer.services/docs/0.13/services.html#Settings
   */
  settings: {
    rest: "/"
  },

  /**
   * Service Mixin
   * More info: https://moleculer.services/docs/0.13/services.html#Mixins
   */
  mixins: [SERVICE_ACTIONS],

  /**
   * Service dependencies
   * More info: https://moleculer.services/docs/0.13/services.html#Dependencies
   */
  dependencies: [],

  /**
   * Actions
   * More info: https://moleculer.services/docs/0.13/actions.html
   */
  actions: {},

  /**
   * Events
   * More info: https://moleculer.services/docs/0.13/events.html
   */
  events: {},

  /**
   * Methods
   * More info: https://moleculer.services/docs/0.13/services.html#Methods
   */
  methods: {},

  /**
   * Service created lifecycle event handler
   * More info: https://moleculer.services/docs/0.13/lifecycle.html#created-event-handler
   */
  created() {},

  /**
   * Service started lifecycle event handler
   * More info: https://moleculer.services/docs/0.13/lifecycle.html#started-event-handler
   */
  started() {},

  /**
   * Service stopped lifecycle event handler
   * More info: https://moleculer.services/docs/0.13/lifecycle.html#stopped-event-handler
   */
  stopped() {}
};
