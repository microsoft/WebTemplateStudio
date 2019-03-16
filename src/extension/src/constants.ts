export const CONSTANTS = {
  ERRORS: {
    INVALID_COMMAND: "Invalid command used",
    RESOURCE_GROUP_NOT_FOUND: "No resource group found with this name",
    SUBSCRIPTION_NOT_FOUND: "No subscription found with this name.",
    FUNCTION_APP_NAME_NOT_AVAILABLE: function (functionName: string) {
      return `Function app name ${functionName} is not available`;
    },
    LOGIN_TIMEOUT: "Timeout. User is not logged in",
    SESSION_NOT_AVAILABLE:
      "There is no session available. Make sure the user is logged in."
  },
  INFO: {
    COSMOS_ACCOUNT_DEPLOYED: function (accountName: string) {
      return `${accountName} has been deployed!`;
    }
  },
  AZURE_LOGIN_STATUS: {
    LOGGED_IN: "LoggedIn",
    LOGGING_IN: "LoggingIn",
    INITIALIZING: "Initializing",
    LOGGED_OUT: "LoggedOut"
  },
  REACT_PANEL: {
    Project_Title: "Project Acorn"
  },
  GENERATE_ENDPOINT: "/api/generate"
};

export enum ExtensionCommand {
  Login = "login",
  Subscriptions = "subscriptions",
  SubscriptionData = "subscriptionData",
  NameFunctions = "name-functions",
  NameCosmos = "name-cosmos",
  DeployFunctions = "deploy-functions",
  DeployCosmos = "deploy-cosmos",
  Generate = "generate",
  GetOutputPath = "getOutputPath",
  HandleTelemetry = "telemetryAI"
}
