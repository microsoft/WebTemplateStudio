export const CONSTANTS = {
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
    GET_ALL_LICENSES_COMMAND_PREFIX: "getalllicences",
    GET_ALL_LICENSES_COMPLETE_STATE: "getAllLicencesResult",
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
    PROJECT_TITLE: "Microsoft Web Template Studio"
  },
  GENERATE_ENDPOINT: "/api/generate",
  ENGINE_DIRECTORY: "./src/api/darwin/CoreTemplateStudio.Api",
  CONNECTION_STRING_MONGO: (
    username: string,
    password: string,
    origin: string
  ): string => {
    return `COSMOSDB_CONNSTR=${origin}/${username}\nCOSMOSDB_USER=${username}\nCOSMOSDB_PASSWORD=${password}\n`;
  },
  CONNECTION_STRING_SQL: (origin: string, primaryKey: string): string => {
    return `COSMOSDB_URI=${origin}\nCOSMOSDB_PRIMARY_KEY=${primaryKey}\n`;
  },
  SQL_CONNECTION_STRING_PREFIX: "accountendpoint=",
  ASPNET_BACKEND_FRAMEWORK_NAME: "AspNet",
  MAX_PROJECT_NAME_LENGTH: 50,
  START_PORT: 9502,
  VSCODE_COMMAND: {
    OPEN_FOLDER: "vscode.openFolder"
  },
  DEPENDENCY_CHECKER: {
    NODE: "node",
    PYTHON: "python",
    PYTHON3: "python3",
    PYTHON_LAUNCHER: "py -3",
    NETCORE: "netcore"
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
  TELEMETRY: {
    LAUNCH_WIZARD_STARTED_POINT: "Launch wizard"
  }
};

export const PROJECT_NAME_VALIDATION_LIMIT = 50;

export enum ExtensionCommand {
  Log = "log",
  OpenLog = "open-log",
  Login = "login",
  Logout = "logout",
  GetResourceGroups = "get-resource-groups",
  GetLocations = "get-locations",
  GetValidAppServiceName = "get-valid-app-service-name",
  GetValidCosmosName = "get-valid-cosmos-name",
  ValidateCosmosName = "validate-cosmos-name",
  ValidateAppServiceName = "validate-appservice-name",
  Generate = "generate",
  GetOutputPath = "get-output-path",
  GetProjectName = "get-project-name",
  GetUserStatus = "get-user-status",
  GetFrameworks = "get-frameworks",
  GetAllLicenses = "get-all-licenses",
  GetLatestVersion = "get-latest-version",
  GetPages = "get-pages",
  GetFeatures = "get-features",
  TrackPageSwitch = "track-page-switch",
  TrackCreateNewProject = "track-create-new-project",
  TrackOpenAddPagesModal = "track-open-add-pages-modal",
  TrackPressQuickstart = "track-press-quickstart",
  TrackOpenAppServiceModalFromServicesList = "track-open-app-service-modal-from-services-list",
  TrackOpenCosmosDBServiceModalFromServicesList = "track-open-cosmosdb-service-modal-from-services-list",
  TrackOpenAzureServiceAdvancedMode = "track-open-azure-service-advanced-mode",
  ProjectPathValidation = "project-path-validation",
  UpdateGenStatus = "update-status",
  OpenProjectVSCode = "open-project-vscode",
  GetTemplateInfo = "get-template-info",
  CloseWizard = "close-wizard",
  GetPort = "get-port",
  GetVersions = "get-versions",
  ResetPages = "reset-pages",
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
  ExtensionLaunch = "Extension-Launch",
  ExtensionClosed = "Extension-closed",
  WizardSession = "Wizard-To-Generate-Session-Time",
  AppServiceDeploy = "Azure-App-Service-Deployment",
  CosmosDBDeploy = "Azure-Cosmos-Deployment",
  ResourceGroupDeploy = "Azure-Resource-Group-Deployment",
  PageChange = "Wizard-Page-Change",
  CreateNewProject = "Create-New-Project",
  SyncEngine = "Sync-Engine",
  ConnectionStringReplace = "Connection-String-Replaced",
  TrackOpenAddPagesModal = "Open-Add-Pages-Modal",
  TrackPressQuickstart = "Press-Quickstart",
  OpenAppServiceModalFromServicesList = "Open-AppService-Modal-From-Services-List",
  OpenCosmosDBServiceModalFromServicesList = "Open-CosmosDBService-Modal-From-Services-List",
  OpenAzureServiceAdvancedMode = "Open-Azure-Service-Advanced-Mode"
}

export const PAYLOAD_MESSAGES_TEXT = {
  RESET_PAGES_TEXT: "Sending reset pages request...",
  SWITCH_FRAMEWORKS_TEXT: "Sending framework change request...",
  SENT_GENERATION_INFO_TEXT: "Sending generation info..."
};

export enum AzureResourceType {
  AppService = "app-service",
  Cosmos = "cosmos",
  AppServicePlan = "app-service-plan"
}

export enum AppType {
  Web = "Web"
}

export enum OS {
  Linux = "linux",
  Windows = "windows"
}
