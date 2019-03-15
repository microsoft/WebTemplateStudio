export const CONSTANTS = {
  ERRORS: {
    INVALID_COMMAND: "Invalid command used",
    RESOURCE_GROUP_NOT_FOUND: "No resource group found with this name",
    SUBSCRIPTION_NOT_FOUND: "No subscription found with this name.",
    FUNCTION_APP_NAME_NOT_AVAILABLE: function(functionName: string) {
      return `Function app name ${functionName} is not available`;
    },
    LOGIN_TIMEOUT: "Timeout. User is not logged in",
    SESSION_NOT_AVAILABLE:
      "There is no session available. Make sure the user is logged in.",
    SUBSCRIPTION_NOT_UNDEFINED:
      "Subscription Item cannot have undefined values.",
    WEBSITE_CLIENT_NOT_UNDEFINED:
      "Website management client cannot be undefined.",
    COSMOS_CLIENT_NOT_UNDEFINED: "Cosmos client cannot be undefined",
    CONNECTION_STRING_FAILED:
      "CosmosDBDeploy: GetConnectionString Failed to create Client with SubscriptionItem - ",
    RUNTIME_NOT_IMPLEMENTED: "Runtime not implemented yet",
    FUNCTIONS_NO_DUPLICATES: "No duplicates allowed for function names",
    FUNCTIONS_INVALID_NAME: function(name: string) {
      return `Invalid function name ${name}. Name can only include alphanumeric characters and dashes, and must start/end with alphanumeric characters`;
    },
    COSMOS_ACCOUNT_NOT_AVAILABLE: function(name: string) {
      return `Account name "${name}" is not available.`;
    },
    COSMOS_VALID_CHARACTERS:
      "The name can only contain lowercase letters, numbers, and the '-' character.",
    NAME_MIN_MAX: function(min: Number, max: Number) {
      return `The name must be between ${min} and ${max} characters.`;
    }
  },
  INFO: {
    COSMOS_ACCOUNT_DEPLOYED: function(accountName: string) {
      return `${accountName} has been deployed!`;
    }
  },
  FUNCTIONS_CONFIG: {
    MAX_NAME_LEN: 60,
    MIN_NAME_LEN: 0
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
  GetFunctionsRuntimes = "getFunctionsRuntimes",
  GetCosmosAPIs = "getCosmosAPIs"
}
