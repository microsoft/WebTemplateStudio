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
   * This will extend (current) `pages` service with action handlers.
   */
  mixins: [SERVICE_ACTIONS],
//}]}
  /**
   * Service dependencies
   * More info: https://moleculer.services/docs/0.13/services.html#Dependencies
   */
  dependencies: [],