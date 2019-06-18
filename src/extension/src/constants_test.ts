export const CONSTANTS = {
  API: {
    WINDOWS_PLATFORM_VERSION: "win32",
    BASE_APPLICATION_NAME: "CoreTemplateStudio.Api",
    PRODUCTION_PATH_TO_TEMPLATES: "..",
    DEVELOPMENT_PATH_TO_TEMPLATES: "../../../../..",
    SYNC_LIVE_MESSAGE_TRIGGER_NAME: "syncMessage",
    GEN_LIVE_MESSAGE_TRIGGER_NAME: "genMessage",
    SIGNALR_API_SYNC_METHOD_NAME: "SyncTemplates",
    SIGNALR_API_GENERATE_METHOD_NAME: "Generate",
    MAX_SYNC_REQUEST_ATTEMPTS: 51,
    SYNC_RETRY_WAIT_TIME: 250,
    ENDPOINTS: {
      PAGE: "/api/page",
      FEATURE: "/api/feature",
      FRAMEWORK: "/api/framework",
      PROJECT_TYPE: "/api/projectType"
    },
    METHODS: {
      GET: "get",
      POST: "post"
    },
    QUERY_PARAMS: {
      FRONTEND_FRAMEWORK: "frontendFramework",
      BACKEND_FRAMEWORK: "backendFramework",
      PROJECT_TYPE: "projectType",
      PLATFORM: "platform",
      PATH: "path"
    }
  },
  AZURE_LOGIN_STATUS: {
    LOGGED_IN: "LoggedIn",
    LOGGING_IN: "LoggingIn",
    INITIALIZING: "Initializing",
    LOGGED_OUT: "LoggedOut"
  },
  REACT_PANEL: {
    Project_Title: "Microsoft Web Template Studio"
  },
  GENERATE_ENDPOINT: "/api/generate",
  ENGINE_DIRECTORY: "./src/api/darwin/CoreTemplateStudio.Api",
  CONNECTION_STRING_MONGO: function(
    username: string,
    password: string,
    origin: string
  ) {
    return `COSMOSDB_CONNSTR=${origin}/${username}\nCOSMOSDB_USER=${username}\nCOSMOSDB_PASSWORD=${password}\n`;
  },
  CONNECTION_STRING_SQL: function(origin: string, primaryKey: string) {
    return `COSMOSDB_URI=${origin}\nCOSMOSDB_PRIMARY_KEY=${primaryKey}\n`;
  },
  SQL_CONNECTION_STRING_PREFIX: "accountendpoint=",
  MAX_PROJECT_NAME_LENGTH: 50,
  START_PORT: 9502
};
