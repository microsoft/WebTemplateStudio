"use strict";

const ApiGateway = require("moleculer-web");
const path = require("path");

module.exports = {
  name: "api",
  /**
   * Service Mixin
   * More info: https://moleculer.services/docs/0.14/services.html#Mixins
   */
  mixins: [ApiGateway],

  // More info about settings: https://moleculer.services/docs/0.14/moleculer-web.html
  settings: {
    port: process.env.PORT || 3001,

    routes: [
      {
        path: "/api",
        whitelist: [
          // Access to any actions in all services under "/api" URL
          "**"
        ],
        /**
         * Dynamically generate the routes
         * More info: https://moleculer.services/docs/0.14/moleculer-web.html#Auto-alias
         */
        autoAliases: true
      }
    ],

    // Serve assets from "build" folder
    assets: {
      folder: path.resolve(__dirname, "..", "build")
    }
  }
};
