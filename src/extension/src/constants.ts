import { MessageItem } from "vscode";
import * as nls from "vscode-nls";

const localize: nls.LocalizeFunc = nls.config({
  messageFormat: nls.MessageFormat.file
})();

export const CONSTANTS = {
  ERRORS: {
    TOO_MANY_FAILED_SYNC_REQUESTS: localize(
      "error.tooManyFailedSyncRequests",
      "Could not sync to template repository"
    ),
    INVALID_COMMAND: localize("error.invalidCommand", "Invalid command used"),
    INVALID_MODULE: localize("error.invalidModule", "Invalid module called"),
    RESOURCE_GROUP_NOT_FOUND: localize(
      "error.resourceGroupNotFound",
      "No resource group found with this name"
    ),
    SUBSCRIPTION_NOT_FOUND: localize(
      "error.subscriptionNotFound",
      "No subscription found with this name."
    ),
    FUNCTION_APP_NAME_NOT_AVAILABLE: (functionName: string) => {
      return localize(
        "error.functionAppNameNotAvailable",
        "Function app name {0} is not available",
        functionName
      );
    },
    LOGOUT_FAILED: localize(
      "error.loginTimeout",
      "Timeout. User is not logged in"
    ),
    LOGIN_TIMEOUT: localize(
      "error.loginTimeout",
      "Timeout. User is not logged in"
    ),
    SESSION_NOT_AVAILABLE: localize(
      "error.sessionNotAvailable",
      "There is no session available. Make sure the user is logged in."
    ),
    SUBSCRIPTION_NOT_DEFINED: localize(
      "error.subscriptionNotDefined",
      "Subscription Item cannot have undefined values."
    ),
    WEBSITE_CLIENT_NOT_DEFINED: localize(
      "error.websiteClientNotDefined",
      "Website management client cannot be undefined."
    ),
    COSMOS_CLIENT_NOT_DEFINED: localize(
      "error.cosmosClientNotDefined",
      "Cosmos client cannot be undefined"
    ),
    CONNECTION_STRING_FAILED: localize(
      "error.connectionStringFailed",
      "CosmosDBDeploy: GetConnectionString Failed to create Client with SubscriptionItem - "
    ),
    RUNTIME_NOT_IMPLEMENTED: localize(
      "error.runtimeNotImplemented",
      "Runtime not implemented yet"
    ),
    FUNCTIONS_NO_DUPLICATES: localize(
      "error.functionsNoDuplicate",
      "No duplicates allowed for function names"
    ),
    FUNCTIONS_INVALID_NAME: (name: string) => {
      return localize(
        "error.functionInvalidName",
        "Invalid function name {0}. Name can only include alphanumeric characters and dashes, and must start/end with alphanumeric characters",
        name
      );
    },
    EMPTY_OUTPUT_PATH: localize(
      "error.emptyOutputPath",
      "Output Path cannot be empty."
    ),
    EMPTY_PROJECT_NAME: localize(
      "error.emptyProjectName",
      "Project Name cannot be empty."
    ),
    PROJECT_NAME_LENGTH_EXCEEDED_MAX: localize(
      "error.projectNameLengthExceededMax",
      "Project Name has to be less than 50 chars long."
    ),
    INVALID_OUTPUT_PATH: (path: string) => {
      return localize(
        "error.invalidOutputPath",
        "Path {0} does not exist.",
        path
      );
    },
    INVALID_PROJECT_NAME: (name: string) => {
      return localize(
        "error.invalidProjectName",
        "{0} is invalid. The project name attribute may only contain letters, numbers, and spaces",
        name
      );
    },
    PROJECT_PATH_EXISTS: (path: string, name: string) => {
      return localize(
        "error.projectPathExists",
        "There exists a directory named {0} in the specified path '{1}', please choose a unique path",
        name,
        path
      );
    },
    COSMOS_ACCOUNT_NOT_AVAILABLE: (name: string) => {
      return localize(
        "error.cosmosAccountNotAvailable",
        'Account name "{0}" is not available.',
        name
      );
    },
    COSMOS_VALID_CHARACTERS: localize(
      "error.cosmosValidCharacters",
      "The name can only contain lowercase letters, numbers, and the '-' character."
    ),
    NAME_MIN_MAX: (min: number, max: number) => {
      return localize(
        "error.nameMinMax",
        "The name must be between {0} and {1} characters.",
        min,
        max
      );
    }
  },
  INFO: {
    COSMOS_ACCOUNT_DEPLOYED: (accountName: string) => {
      return localize(
        "info.cosmosAccountDeployed",
        "{0} has been deployed!",
        accountName
      );
    },
    FUNCTION_APP_DEPLOYED: (appName: string) => {
      return localize(
        "info.functionAppDeployed",
        "Function App {0} has been deployed and is ready to use!",
        appName
      );
    },
    FILE_REPLACED_MESSAGE: localize(
      "info.fileReplacedMessage",
      "Replaced file at: "
    ),
    STARTING_GENERATION_SERVER: localize(
      "info.startingServerMessage",
      "Starting Generation Server"
    ),
    SYNC_STATUS: localize("info.syncStatus", "Sync Status: ")
  },
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
    Endpoints: {
      Feature: "/api/feature",
      Framework: "/api/framework",
      Page: "/api/page",
      ProjectType: "/api/projectType"
    },
    Methods: {
      GET: "get",
      POST: "post"
    },
    QueryParams: {
      FrontendFramework: "frontendFramework",
      BackendFramework: "backendFramework",
      Path: "path",
      Platform: "platform",
      ProjectType: "projectType"
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
  START_PORT: 9502,
  VSCODE_COMMAND: {
    OPEN_FOLDER: "vscode.openFolder"
  }
};

export enum ExtensionCommand {
  Log = "log",
  Login = "login",
  Logout = "logout",
  Subscriptions = "subscriptions",
  SubscriptionDataForCosmos = "subscription-data-for-cosmos",
  SubscriptionDataForFunctions = "subscription-data-for-functions",
  NameFunctions = "name-functions",
  NameCosmos = "name-cosmos",
  DeployFunctions = "deploy-functions",
  DeployCosmos = "deploy-cosmos",
  Generate = "generate",
  GetOutputPath = "get-output-path",
  GetFunctionsRuntimes = "get-functions-runtimes",
  GetCosmosAPIs = "get-cosmos-apis",
  GetUserStatus = "get-user-status",
  TrackPageSwitch = "track-page-switch",
  ProjectPathValidation = "project-path-validation",
  UpdateGenStatusMessage = "update-status-message",
  UpdateGenStatus = "update-status",
  OpenProjectVSCode = "open-project-vscode",
  GetVersions = "get-versions",
  CloseWizard = "close-wizard",
  GetPort = "get-port",
  ResetPages = "reset-pages",
  GetPreviewStatus = "get-preview"
}
export enum ExtensionModule {
  Azure = "Azure",
  Generate = "GenerateExperience",
  Telemetry = "Telemetry",
  Validator = "Validator",
  VSCodeUI = "VSCodeUI",
  Logger = "Logger"
}

export enum TelemetryEventName {
  ExtensionLaunch = "Extension-Launch-Time",
  WizardSession = "Wizard-To-Generate-Session-Time",
  Subscriptions = "Acquire-Subscription-Names",
  SubscriptionData = "Acquire-Subscription-Data",
  EngineGeneration = "Engine-Generation-Time",
  CosmosDBDeploy = "Azure-Cosmos-Deployment",
  FunctionsDeploy = "Azure-Functions-Deployment",
  PageChange = "Wizard-Page-Change",
  SyncEngine = "Sync-Engine",
  ConnectionStringReplace = "Connection-String-Replaced",
  PerformLogin = "Perform-Login",
  PerformLogout = "Perform-Logout",
  GetUserLoginStatus = "Get-User-Login-Status"
}

export namespace DialogResponses {
  export const yes: MessageItem = { title: localize("dialog.yes", "Yes") };
  export const no: MessageItem = { title: localize("dialog.no", "No") };
  export const cancel: MessageItem = {
    title: localize("dialog.cancel", "Cancel"),
    isCloseAffordance: true
  };
  export const deleteResponse: MessageItem = {
    title: localize("dialog.delete", "Delete")
  };
  export const learnMore: MessageItem = {
    title: localize("dialog.learnMore", "Learn more")
  };
  export const dontWarnAgain: MessageItem = {
    title: localize("dialog.dontWarnAgain", "Don't warn again")
  };
  export const skipForNow: MessageItem = {
    title: localize("dialog.skipForNow", "Skip for now")
  };
  export const reportAnIssue: MessageItem = {
    title: localize("dialog.reportAnIssue", "Report an issue")
  };
}
export namespace DialogMessages {
  export const multiLineError: string = localize(
    "dialog.multilineError",
    "An error has occured. Check output window for more details."
  );
  export const cosmosDBConnectStringReplacePrompt: string = localize(
    "dialog.cosmosDBConnectStringReplacePrompt",
    "Replace your DB connection string in the .env file with the generated CosmosDB connection string?"
  );
  export const resetPagesPrompt: string = localize(
    "dialog.resetPagesPrompt",
    "Switching Frameworks will reset pages in your queue. Are you sure you want to proceed?"
  );
}

export enum AzureResourceType {
  Cosmos = "cosmos",
  Functions = "functions"
}
