"use strict";

const ApiGateway = require("moleculer-web");

module.exports = {
  name: "api",
  /**
   * Service Mixin
   * More info: https://moleculer.services/docs/0.13/services.html#Mixins
   */
  mixins: [ApiGateway],

  // More info about settings: https://moleculer.services/docs/0.13/moleculer-web.html
  settings: {
    port: process.env.PORT || 3001,

    routes: [
      {
        path: "/api",
        whitelist: [
          // Access to any actions in all services under "/api" URL
          "**"
        ],
        // Dynamically generate the routes
        autoAliases: true
      }
    ],

    // Serve assets from "public" folder
    assets: {
      folder: "public"
    }
  }
};
