import { MessageItem } from "vscode";
import * as nls from "vscode-nls";

export const CONSTANTS = {
  ERRORS: {
    INVALID_COMMAND: "Invalid command used",
    RESOURCE_GROUP_NOT_FOUND: "No resource group found with this name",
    SUBSCRIPTION_NOT_FOUND: "No subscription found with this name.",
    FUNCTION_APP_NAME_NOT_AVAILABLE: (functionName: string) => {
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
    FUNCTIONS_INVALID_NAME: (name: string) => {
      return `Invalid function name ${name}. Name can only include alphanumeric characters and dashes, and must start/end with alphanumeric characters`;
    },
    EMPTY_OUTPUT_PATH: "Output Path cannot be empty.",
    EMPTY_PROJECT_NAME: "Project Name cannot be empty.",
    PROJECT_NAME_LENGTH_EXCEEDED_MAX: "Project Name has to be less than 50 chars long.",
    INVALID_OUTPUT_PATH: (path: string) => {
      return `Path ${path} does not exist.`;
    },
    INVALID_PROJECT_NAME: (name: string) => {
      return `${name} is invalid. The project name attribute may only contain letters, numbers, and spaces`;
    },
    PROJECT_PATH_EXISTS: (path: string, name: string) => {
      return `There exists a directory named ${name} in the specified path '${path}', please choose a unique path`;
    },
    COSMOS_ACCOUNT_NOT_AVAILABLE: (name: string) => {
      return `Account name "${name}" is not available.`;
    },
    COSMOS_VALID_CHARACTERS:
      "The name can only contain lowercase letters, numbers, and the '-' character.",
    NAME_MIN_MAX: (min: Number, max: Number) => {
      return `The name must be between ${min} and ${max} characters.`;
    }
  },
  INFO: {
    COSMOS_ACCOUNT_DEPLOYED: (accountName: string) => {
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
    BASE_APPLICATION_NAME: "CoreTemplateStudio.Api",
    PATH_TO_TEMPLATES: "..",
    SYNC_LIVE_MESSAGE_TRIGGER_NAME: "syncMessage",
    GEN_LIVE_MESSAGE_TRIGGER_NAME: "genMessage",
    SIGNALR_API_SYNC_METHOD_NAME: "SyncTemplates",
    SIGNALR_API_GENERATE_METHOD_NAME: "Generate"
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
  MAX_PROJECT_NAME_LENGTH: 50,
  PORT: "5000"
};

export enum ExtensionCommand {
  Login = "login",
  Subscriptions = "subscriptions",
  SubscriptionDataForCosmos = "subscriptionDataForCosmos",
  SubscriptionDataForFunctions = "subscriptionDataForFunctions",
  NameFunctions = "name-functions",
  NameCosmos = "name-cosmos",
  DeployFunctions = "deploy-functions",
  DeployCosmos = "deploy-cosmos",
  Generate = "generate",
  GetOutputPath = "getOutputPath",
  HandleTelemetry = "telemetryAI",
  GetFunctionsRuntimes = "getFunctionsRuntimes",
  GetCosmosAPIs = "getCosmosAPIs",
  GetUserStatus = "getUserStatus",
  ProjectPathAndNameValidation = "project-path-and-name-validation"
}

export enum AzureResourceType {
  Cosmos = "cosmos",
  Functions = "functions"
}

const localize: nls.LocalizeFunc = nls.loadMessageBundle();
export namespace DialogResponses {
  export const yes: MessageItem = { title: localize("yes", "Yes") };
  export const no: MessageItem = { title: localize("no", "No") };
  export const cancel: MessageItem = {
    title: localize("cancel", "Cancel"),
    isCloseAffordance: true
  };
  export const deleteResponse: MessageItem = {
    title: localize("delete", "Delete")
  };
  export const learnMore: MessageItem = {
    title: localize("learnMore", "Learn more")
  };
  export const dontWarnAgain: MessageItem = {
    title: localize("dontWarnAgain", "Don't warn again")
  };
  export const skipForNow: MessageItem = {
    title: localize("skipForNow", "Skip for now")
  };
  export const reportAnIssue: MessageItem = {
    title: localize("reportAnIssue", "Report an issue")
  };
}
export namespace DialogMessages {
  export const multiLineError: string = localize(
    "multilineError",
    "An error has occured. Check output window for more details."
  );
}
export enum SyncStatus {
  None = 0,
  Updating = 1,
  Updated = 2,
  CheckingForUpdates = 3,
  NoUpdates = 4,
  Acquiring = 5,
  Preparing = 6,
  NewWizardVersionAvailable = 7,
  Ready = 8,
  ErrorAcquiring = 9
}
