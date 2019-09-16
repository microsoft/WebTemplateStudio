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
    CREATION_TRIES_EXCEEDED: (resourceType: string) => {
      return localize(
        "error.triesExceeded",
        "Number of tries exceeded for creating {0}",
        resourceType
      );
    },
    VALIDATION_TRIES_EXCEEDED: (resourceType: string) => {
      return localize(
        "error.validationTriesExceeded",
        "Number of tries exceeded for validating {0} name",
        resourceType
      );
    },
    SUBSCRIPTION_NOT_FOUND: localize(
      "error.subscriptionNotFound",
      "No subscription found with this name."
    ),
    APP_NAME_NOT_AVAILABLE: (appName: string, type: string) => {
      return localize(
        "error.functionAppNameNotAvailable",
        "{1} app name {0} is not available",
        appName,
        type
      );
    },
    APP_SERVICE_UNDEFINED_ID: localize(
      "error.appServiceUndefinedId",
      "Undefined App Service ID"
    ),
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
    AZURE_RESOURCE_CLIENT_NOT_DEFINED: localize(
      "error.azureResourceClientNotDefined",
      "Azure resource management client cannot be undefined"
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
    APP_INVALID_NAME: (name: string) => {
      return localize(
        "error.functionInvalidName",
        "Invalid name {0}. Name can only include alphanumeric characters and dashes, and must start/end with alphanumeric characters",
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
    PATH_WITH_EMOJIS: (path: string) => {
      return localize(
        "error.pathWithEmojis",
        "{0} is invalid. Project Path cannot contain emojis",
        path
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
    APP_DEPLOYED: (appName: string, type: string) => {
      return localize(
        "info.functionAppDeployed",
        "{1} App {0} has been deployed and is ready to use!",
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
  CLI: {
    BASE_CLI_TOOL_NAME: "Microsoft.Templates.Cli",
    SYNC_COMPLETE_STATE: "syncResult",
    SYNC_PROGRESS_STATE: "syncProgress",
    GET_FEATURES_COMPLETE_STATE: "getFeaturesResult",
    GET_FRAMEWORKS_COMPLETE_STATE: "getFrameworksResult",
    GET_PAGES_COMPLETE_STATE: "getPagesResult",
    GET_PROJECT_TYPES_COMPLETE_STATE: "getProjectTypesResult",
    GENERATE_COMPLETE_STATE: "generateResult",
    GENERATE_PROGRESS_STATE: "generateProgress",
    WINDOWS_PLATFORM_VERSION: "win32",
    SYNC_COMMAND_PREFIX: "sync",
    GET_FRAMEWORKS_COMMAND_PREFIX: "getframeworks",
    GET_PAGES_COMMAND_PREFIX: "getpages",
    GET_FEATURES_COMMAND_PREFIX: "getfeatures",
    GET_PROJECT_TYPES_COMMAND_PREFIX: "getprojecttypes",
    GENERATE_COMMAND_PREFIX: "generate"
  },
  API: {
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
  CONNECTION_STRING_MONGO: (
    username: string,
    password: string,
    origin: string
  ) => {
    return `COSMOSDB_CONNSTR=${origin}/${username}\nCOSMOSDB_USER=${username}\nCOSMOSDB_PASSWORD=${password}\n`;
  },
  CONNECTION_STRING_SQL: (origin: string, primaryKey: string) => {
    return `COSMOSDB_URI=${origin}\nCOSMOSDB_PRIMARY_KEY=${primaryKey}\n`;
  },
  SQL_CONNECTION_STRING_PREFIX: "accountendpoint=",
  MAX_PROJECT_NAME_LENGTH: 50,
  START_PORT: 9502,
  VSCODE_COMMAND: {
    OPEN_FOLDER: "vscode.openFolder"
  },
  DEPENDENCY_CHECKER: {
    NODE: "node",
    PYTHON: "python",
    PYTHON3: "python3",
    PYTHON_LAUNCHER: "py -3"
  },
  AZURE_LOCATION: {
    CENTRAL_US: "Central US"
  },
  APP_SERVICE_DOMAIN: ".azurewebsites.net",
  APP_NAME: {
    MAX_LENGTH: 60,
    MIN_LENGTH: 3
  },
  APP_SERVICE_PLAN_NAME: {
    MAX_LENGTH: 40
  },
  COSMOS_DB_NAME: {
    MAX_LENGTH: 31,
    MIN_LENGTH: 3
  },
  DEPLOYMENT_NAME: {
    MAX_LENGTH: 64
  },
  SKU_DESCRIPTION: {
    FREE: {
      capacity: 1,
      family: "F",
      name: "F1",
      size: "F1",
      tier: "Free"
    },
    BASIC: {
      capacity: 1,
      family: "B",
      name: "B1",
      size: "B1",
      tier: "Basic"
    }
  },
  VALIDATION_LIMIT: 3,
  APP_SERVICE_DEPLOYMENT: {
    SERVER_FOLDER: "server",
    DOT_VSCODE_FOLDER: ".vscode",
    SETTINGS_FILE_NAME: "settings.json",
    SETTINGS_FILE: (id: string, subpath: string) => {
      return `{
    "appService.defaultWebAppToDeploy": "${id}",
    "appService.deploySubpath": "${subpath}"
}`;
    },
    DEPLOYMENT_FILE_NAME: ".deployment",
    DEPLOYMENT_FILE: `[config] 
SCM_DO_BUILD_DURING_DEPLOYMENT=true`
  }
};

export const PROJECT_NAME_VALIDATION_LIMIT = 50;

export enum ExtensionCommand {
  Log = "log",
  Login = "login",
  Logout = "logout",
  Subscriptions = "subscriptions",
  SubscriptionDataForFunctions = "subscription-data-for-functions",
  SubscriptionDataForCosmos = "subscription-data-for-cosmos",
  SubscriptionDataForAppService = "subscription-data-for-app-service",
  NameFunctions = "name-functions",
  NameCosmos = "name-cosmos",
  NameAppService = "name-app-service",
  DeployFunctions = "deploy-functions",
  DeployCosmos = "deploy-cosmos",
  Generate = "generate",
  GetOutputPath = "get-output-path",
  GetProjectName = "get-project-name",
  GetFunctionsRuntimes = "get-functions-runtimes",
  GetCosmosAPIs = "get-cosmos-apis",
  GetUserStatus = "get-user-status",
  GetFrameworks = "get-frameworks",
  GetPages = "get-pages",
  TrackPageSwitch = "track-page-switch",
  ProjectPathValidation = "project-path-validation",
  UpdateGenStatusMessage = "update-status-message",
  UpdateGenStatus = "update-status",
  OpenProjectVSCode = "open-project-vscode",
  GetVersions = "get-versions",
  CloseWizard = "close-wizard",
  GetPort = "get-port",
  ResetPages = "reset-pages",
  GetPreviewStatus = "get-preview",
  CheckDependency = "check-dependency"
}
export enum ExtensionModule {
  Azure = "Azure",
  Generate = "GenerateExperience",
  Telemetry = "Telemetry",
  Validator = "Validator",
  VSCodeUI = "VSCodeUI",
  Logger = "Logger",
  DependencyChecker = "DependencyChecker",
  CoreTSModule = "CoreTSModule",
  Defaults = "Defaults"
}

export enum TelemetryEventName {
  ExtensionLaunch = "Extension-Launch-Time",
  WizardSession = "Wizard-To-Generate-Session-Time",
  Subscriptions = "Acquire-Subscription-Names",
  SubscriptionData = "Acquire-Subscription-Data",
  EngineGeneration = "Engine-Generation-Time",
  AppServiceDeploy = "Azure-App-Service-Deployment",
  CosmosDBDeploy = "Azure-Cosmos-Deployment",
  FunctionsDeploy = "Azure-Functions-Deployment",
  ResourceGroupDeploy = "Azure-Resource-Group-Deployment",
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
    "Are you sure you want to reset all the selected pages?"
  );
  export const logoutPrompt: string = localize(
    "dialog.logoutPrompt",
    "Are you sure you want to sign out of your Azure account?"
  );
}

export const PAYLOAD_MESSAGES_TEXT = {
  RESET_PAGES_TEXT: "Sending reset pages request...",
  SWITCH_FRAMEWORKS_TEXT: "Sending framework change request...",
  SENT_GENERATION_INFO_TEXT: "Sending generation info..."
};

export enum AzureResourceType {
  AppService = "app-service",
  Cosmos = "cosmos",
  Functions = "functions",
  AppServicePlan = "app-service-plan"
}

export enum AppType {
  Web = "Web",
  Function = "Function"
}

export enum OS {
  Linux = "linux",
  Windows = "windows"
}

export const BackendFrameworkLinuxVersion: { [s: string]: string } = {
  Node: "node|10.14",
  Flask: "python|3.7"
};
