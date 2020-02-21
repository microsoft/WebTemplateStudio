"use strict";

module.exports = {
  name: "pages",

  /**
   * Service settings
   * More info: https://moleculer.services/docs/0.14/services.html#Settings
   */
  settings: {
    rest: "/"
  },
  /**
   * Service Mixin
   * More info: https://moleculer.services/docs/0.14/services.html#Mixins
   */
  mixins: [],
  /**
   * Service dependencies
   * More info: https://moleculer.services/docs/0.14/services.html#Dependencies
   */
  dependencies: [],

  /**
   * Service Actions
   * More info: https://moleculer.services/docs/0.14/actions.html
   */
  actions: {
    // Action handlers
  },

  /**
   * Service Events
   * More info: https://moleculer.services/docs/0.14/events.html
   */
  events: {},

  /**
   * Service Methods
   * More info: https://moleculer.services/docs/0.14/services.html#Methods
   */
  methods: {},

  /**
   * Service created lifecycle event handler
   * More info: https://moleculer.services/docs/0.14/lifecycle.html#created-event-handler
   */
  created() {},

  /**
   * Service started lifecycle event handler
   * More info: https://moleculer.services/docs/0.14/lifecycle.html#started-event-handler
   */
  async started() {},

  /**
   * Service stopped lifecycle event handler
   * More info: https://moleculer.services/docs/0.14/lifecycle.html#stopped-event-handler
   */
  async stopped() {}
};
