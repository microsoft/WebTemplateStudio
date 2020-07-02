import { defineMessages } from "react-intl";



const PROJECT_NAME_CHARACTER_LIMIT = 50;

const PAGE_NAME_CHARACTER_LIMIT = 50;

const MAX_PAGES_ALLOWED = 20;

const WEB_TEMPLATE_STUDIO_LINKS = {
  REPO: "https://github.com/Microsoft/WebTemplateStudio",
  ISSUES: "https://github.com/Microsoft/WebTemplateStudio/issues"
};

const AZURE_LINKS = {
  CREATE_NEW_SUBSCRIPTION: "https://account.azure.com/signup?showCatalog=True&appId=SubscriptionsBlade",
  CREATE_NEW_RESOURCE_GROUP: "https://portal.azure.com/#create/Microsoft.ResourceGroup",
  APP_SERVICE_PLAN:"https://azure.microsoft.com/en-us/pricing/details/app-service/plans/",
  VIEW_GENERATE_APP_SERVICE: "https://portal.azure.com/#blade/HubsExtension/BrowseResourceBlade/resourceType/Microsoft.Web%2Fsites",
  VIEW_GENERATE_MONGO_DB: "https://portal.azure.com/#blade/HubsExtension/BrowseResourceBlade/resourceType/Microsoft.DocumentDb%2FdatabaseAccounts"
};

const PRODUCTION = "production";
const DEVELOPMENT = "development";
const TEST = "test";

const INTL_MESSAGES = defineMessages({
  EMPTY_FIELD: {
    id: "constants.emptyField",
    defaultMessage: "{fieldId} field cannot be empty"
  }
});

const BOOTSTRAP_LICENSE =
  "https://github.com/twbs/bootstrap/blob/master/LICENSE";

const ARIA_LABELS_NAVIGATION = defineMessages({
  ARIA_LABELS_MESSAGES: {
    id: "ariaLabels.pageNavigation",
    defaultMessage: "{pagesText} page"
  },
  ARIA_LABELS_CURRENT_PAGE: {
    id: "ariaLabels.currentPage",
    defaultMessage: "Currently on {pagesText} page"
  },
  ARIA_LABELS_DISABLED_PAGE: {
    id: "ariaLabels.disabledPage",
    defaultMessage: "{pagesText} page disabled"
  }
});

const PAYLOAD_MESSAGES_TEXT = {
  SWITCH_FRAMEWORKS_TEXT: "Sending framework change request...",
  SENT_GENERATION_INFO_TEXT: "Sending generation info..."
};

const ROUTES = {
  PAGE_DETAILS: "/PageDetail",
  SELECT_FRAMEWORKS:  "/SelectFrameworks",
  SELECT_PAGES: "/SelectPages",
  ADD_SERVICES: "/AddPages",
  REVIEW_AND_GENERATE :"/ReviewAndGenerate",
  NEW_PROJECT: "/"
};


// Presents the routes in the order of the wizard
const ROUTES_ARRAY = [
  ROUTES.NEW_PROJECT,
  ROUTES.SELECT_FRAMEWORKS,
  ROUTES.SELECT_PAGES,
  ROUTES.ADD_SERVICES,
  ROUTES.REVIEW_AND_GENERATE
];

const SERVICE_KEYS = {
  COSMOS_DB: "cosmosDB",
  APP_SERVICE: "appService"
};

enum AzureResourceType {
  AppService = "app-service",
  Cosmos = "cosmos"
}

const AZURE = {
  COSMOS_APIS: {
    MONGO: "MongoDB",
    SQL: "SQL"
  },
  DEFAULT_LOCATION: "Central US",
  DEFAULT_RESOURCE_GROUP: ""
}

enum FRAMEWORK_TYPE {
  FRONTEND = "frontend",
  BACKEND = "backend"
}

enum KEY_EVENTS {
  ENTER = "Enter",
  SPACE = " ",
  TAB = "Tab"
}

const WIZARD_CONTENT_INTERNAL_NAMES = {
  ANGULAR: "Angular",
  APP_SERVICE: "wts.Feature.Azure.AppService",
  AZURE: "wts.Feature.Azure",
  REACT_BLANK_PAGE: "wts.Page.React.Blank",
  REACT_CONTENT_GRID: "wts.Page.React.Grid",
  REACT_MASTER_DETAIL: "wts.Page.React.MasterDetail",
  REACT_LIST: "wts.Page.React.List",
  ANGULAR_BLANK_PAGE: "wts.Page.Angular.Blank",
  ANGULAR_CONTENT_GRID: "wts.Page.Angular.Grid",
  ANGULAR_MASTER_DETAIL: "wts.Page.Angular.MasterDetail",
  ANGULAR_LIST: "wts.Page.Angular.List",
  COSMOS_DB: "wts.Feature.Azure.Cosmos",
  COSMOS_DB_MONGO: "wts.Feature.Azure.Cosmos.Mongo",
  COSMOS_DB_SQL: "wts.Feature.Azure.Cosmos.SQL",
  FULL_STACK_APP: "FullStackWebApp",
  NODE: "Node",
  MOLECULER: "Moleculer",
  ASPNET: "AspNet",
  FLASK: "Flask",
  REACT: "React",
  REST_API: "RestAPI",
  VUE: "Vue",
  VUE_BLANK_PAGE: "wts.Page.Vue.Blank",
  VUE_CONTENT_GRID: "wts.Page.Vue.Grid",
  VUE_MASTER_DETAIL: "wts.Page.Vue.MasterDetail",
  VUE_LIST: "wts.Page.Vue.List"
};

enum SERVICE_GROUPS {
  HOSTING = "CloudHosting",
  DATABASE = "CloudDatabase",
}

const EXTENSION_MODULES = {
  AZURE: "Azure",
  GENERATE: "GenerateExperience",
  TELEMETRY: "Telemetry",
  VALIDATOR: "Validator",
  VSCODEUI: "VSCodeUI",
  DEPENDENCYCHECKER: "DependencyChecker",
  CORETS: "CoreTSModule",
  DEFAULTS: "Defaults",
  LOGGER: "Logger",
};

// Define extension commands here that should be received from the extension
const EXTENSION_COMMANDS = {
  AZURE_LOGIN: "login",
  AZURE_LOGOUT: "logout",
  GENERATE: "generate",
  GET_OUTPUT_PATH: "get-output-path",
  GET_PROJECT_NAME: "get-project-name",
  GET_USER_STATUS: "get-user-status",
  VALIDATE_COSMOS_NAME: "validate-cosmos-name",
  VALIDATE_APPSERVICE_NAME: "validate-appservice-name",
  PROJECT_PATH_VALIDATION: "project-path-validation",
  GET_RESOURCE_GROUPS: "get-resource-groups",
  GET_LOCATIONS: "get-locations",
  GET_VALID_APP_SERVICE_NAME: "get-valid-app-service-name",
  GET_VALID_COSMOS_NAME: "get-valid-cosmos-name",
  TRACK_PAGE_SWITCH: "track-page-switch",
  TRACK_CREATE_NEW_PROJECT: "track-create-new-project",
  TRACK_PRESS_QUICKSTART: "track-press-quickstart",
  TRACK_OPEN_APP_SERVICE_MODAL_FROM_SERVICES_LIST: "track-open-app-service-modal-from-services-list",
  TRACK_OPEN_COSMOSDB_SERVICE_MODAL_FROM_SERVICES_LIST: "track-open-cosmosdb-service-modal-from-services-list",
  TRACK_OPEN_AZURE_SERVICE_ADVANCED_MODE: "track-open-azure-service-advanced-mode",
  GEN_STATUS: "update-status",
  OPEN_PROJECT_IN_VSCODE: "open-project-vscode",
  GET_TEMPLATE_INFO: "get-template-info",
  CLOSE_WIZARD: "close-wizard",
  GET_VERSIONS: "get-versions",
  GET_DEPENDENCY_INFO: "check-dependency",
  GET_FRAMEWORKS: "get-frameworks",
  GET_ALL_LICENSES: "get-all-licenses",
  GET_LATEST_VERSION:"get-latest-version",
  GET_PAGES: "get-pages",
  GET_FEATURES: "get-features",
  GET_VALIDATIONS: "get-validations",
  LOG: "log",
  OPEN_LOG: "open-log"
};

const TELEMETRY = {
  CLOSE_GENERATION_MODAL_BUTTON: "Generate Modal, close button",
  CREATE_NEW_PROJECT_BUTTON: "Generate Modal, create new project button"
}

export {
  PRODUCTION,
  EXTENSION_MODULES,
  EXTENSION_COMMANDS,
  ROUTES,
  ROUTES_ARRAY,
  SERVICE_KEYS,
  WIZARD_CONTENT_INTERNAL_NAMES,
  INTL_MESSAGES,
  ARIA_LABELS_NAVIGATION,
  AZURE,
  DEVELOPMENT,
  TEST,
  PROJECT_NAME_CHARACTER_LIMIT,
  PAGE_NAME_CHARACTER_LIMIT,
  MAX_PAGES_ALLOWED,
  WEB_TEMPLATE_STUDIO_LINKS,
  AZURE_LINKS,
  FRAMEWORK_TYPE,
  KEY_EVENTS,
  PAYLOAD_MESSAGES_TEXT,
  BOOTSTRAP_LICENSE,
  TELEMETRY,
  AzureResourceType,
  SERVICE_GROUPS
};
