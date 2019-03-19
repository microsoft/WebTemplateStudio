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
      "There is no session available. Make sure the user is logged in.",
    EMPTY_OUTPUT_PATH: "Output Path cannot be empty.",
    EMPTY_PROJECT_NAME: "Project Name cannot be empty.",
    PROJECT_NAME_LENGTH_EXCEEDED_MAX: "Project Name has to be less than 50 chars long.",
    INVALID_OUTPUT_PATH: "Output Path does not exist.",
    PROJECT_PATH_EXISTS: "There exists a directory with the Project name, please choose a unique name."
  },
  INFO: {
    COSMOS_ACCOUNT_DEPLOYED: function (accountName: string) {
      return `${accountName} has been deployed!`;
    }
  },
  API: {
    WINDOWS_PLATFORM_VERSION: "win32",
    BASE_APPLICATION_NAME: "CoreTemplateStudio.Api"
  },
  MAX_PROJECT_NAME_LENGTH: 50,
  GENERATE_ENDPOINT: "/api/generate",
  REACT_PANEL: {
    Project_Title: "Project Acorn"
  },
  AZURE_LOGIN_STATUS: {
    LOGGED_IN: "LoggedIn",
    LOGGING_IN: "LoggingIn",
    INITIALIZING: "Initializing",
    LOGGED_OUT: "LoggedOut"
  },
  PORT: "5000"
}

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
  ValidateOutputPath = "validatePath"
}
