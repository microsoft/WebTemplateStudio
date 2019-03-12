export const CONSTANTS = {
  ERRORS: {
    INVALID_COMMAND: "Invalid command used",
    RESOURCE_GROUP_NOT_FOUND: "No resource group found with this name",
    SUBSCRIPTION_NOT_FOUND: "No subscription found with this name.",
<<<<<<< HEAD
    FUNCTION_APP_NAME_NOT_AVAILABLE: (functionName: string) => {
=======
    FUNCTION_APP_NAME_NOT_AVAILABLE: function (functionName: string) {
>>>>>>> Input validation
      return `Function app name ${functionName} is not available`;
    },
    LOGIN_TIMEOUT: "Timeout. User is not logged in",
    SESSION_NOT_AVAILABLE:
      "There is no session available. Make sure the user is logged in.",
    SUBSCRIPTION_NOT_DEFINED: "Subscription Item cannot have undefined values.",
    WEBSITE_CLIENT_NOT_DEFINED:
      "Website management client cannot be undefined.",
    COSMOS_CLIENT_NOT_DEFINED: "Cosmos client cannot be undefined",
    CONNECTION_STRING_FAILED:
      "CosmosDBDeploy: GetConnectionString Failed to create Client with SubscriptionItem - ",
    RUNTIME_NOT_IMPLEMENTED: "Runtime not implemented yet",
    FUNCTIONS_NO_DUPLICATES: "No duplicates allowed for function names",
<<<<<<< HEAD
    FUNCTIONS_INVALID_NAME: (name: string) => {
      return `Invalid function name ${name}. Name can only include alphanumeric characters and dashes, and must start/end with alphanumeric characters`;
    },
    COSMOS_ACCOUNT_NOT_AVAILABLE: (name: string) => {
=======
    FUNCTIONS_INVALID_NAME: function (name: string) {
      return `Invalid function name ${name}. Name can only include alphanumeric characters and dashes, and must start/end with alphanumeric characters`;
    },
    EMPTY_OUTPUT_PATH: "Output Path cannot be empty.",
    EMPTY_PROJECT_NAME: "Project Name cannot be empty.",
    PROJECT_NAME_LENGTH_EXCEEDED_MAX: "Project Name has to be less than 50 chars long.",
    INVALID_OUTPUT_PATH: "Output Path does not exist.",
    PROJECT_PATH_EXISTS: "There exists a directory with the Project name, please choose a unique name.",
    COSMOS_ACCOUNT_NOT_AVAILABLE: function (name: string) {
>>>>>>> Input validation
      return `Account name "${name}" is not available.`;
    },
    COSMOS_VALID_CHARACTERS:
      "The name can only contain lowercase letters, numbers, and the '-' character.",
<<<<<<< HEAD
    NAME_MIN_MAX: (min: Number, max: Number) => {
=======
    NAME_MIN_MAX: function (min: Number, max: Number) {
>>>>>>> Input validation
      return `The name must be between ${min} and ${max} characters.`;
    }
  },
  INFO: {
<<<<<<< HEAD
    COSMOS_ACCOUNT_DEPLOYED: (accountName: string) => {
=======
    COSMOS_ACCOUNT_DEPLOYED: function (accountName: string) {
>>>>>>> Input validation
      return `${accountName} has been deployed!`;
    },
    FUNCTION_APP_DEPLOYED: (appName: string) => {
      return `Function App ${appName} has been deployed and is ready to use!`;
    }
  },
  FUNCTIONS_CONFIG: {
    MAX_NAME_LEN: 60,
    MIN_NAME_LEN: 1
  },
  API: {
    WINDOWS_PLATFORM_VERSION: "win32",
    BASE_APPLICATION_NAME: "CoreTemplateStudio.Api"
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
  GENERATE_ENDPOINT: "/api/generate",
  MAX_PROJECT_NAME_LENGTH: 50
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
  GetFunctionsRuntimes = "getFunctionsRuntimes",
  GetCosmosAPIs = "getCosmosAPIs",
  GetUserStatus = "getUserStatus"
}
