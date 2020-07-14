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

export const CLI = {
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
};

export const API = {
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
};