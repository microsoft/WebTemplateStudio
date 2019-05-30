import { defineMessages } from "react-intl";

const PAGE_DETAILS = "/PageDetail";
const SELECT_PROJECT_TYPE = "/SelectWebApp";
const SELECT_FRAMEWORKS = "/SelectFrameworks";
const SELECT_PAGES = "/SelectPages";
const AZURE_LOGIN = "/AzureLogin";
const REVIEW_AND_GENERATE = "/ReviewAndGenerate";
const NEW_PROJECT = "/";

const PRODUCTION = "production";
const DEVELOPMENT = "development";

const INTL_MESSAGES = defineMessages({
  EMPTY_FIELD: {
    id: "constants.emptyField",
    defaultMessage: "{fieldId} field cannot be empty"
  }
});

const ROUTES = {
  PAGE_DETAILS,
  SELECT_PROJECT_TYPE,
  SELECT_FRAMEWORKS,
  SELECT_PAGES,
  AZURE_LOGIN,
  REVIEW_AND_GENERATE,
  NEW_PROJECT
};

// Presents the routes in the order of the wizard
const ROUTES_ARRAY = [
  NEW_PROJECT,
  SELECT_PROJECT_TYPE,
  SELECT_FRAMEWORKS,
  SELECT_PAGES,
  AZURE_LOGIN,
  REVIEW_AND_GENERATE
];

const SERVICE_KEYS = {
  COSMOS_DB: "cosmosDB",
  AZURE_FUNCTIONS: "azureFunctions"
};

const COSMOS_APIS = {
  MONGO: "MongoDB",
  SQL: "SQL"
};

const WIZARD_CONTENT_INTERNAL_NAMES = {
  ANGULAR: "Angular",
  AZURE: "wts.Feature.Azure",
  AZURE_FUNCTIONS: "wts.Feature.Azure.AzureFunctions",
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
  NODE_JS: "NodeJS",
  REACT_JS: "ReactJS",
  REST_API: "RestAPI"
};

const EXTENSION_MODULES = {
  AZURE: "Azure",
  GENERATE: "GenerateExperience",
  TELEMETRY: "Telemetry",
  VALIDATOR: "Validator",
  VSCODEUI: "VSCodeUI"
};
// Define extension commands here that should be received from the extension
const EXTENSION_COMMANDS = {
  AZURE_LOGIN: "login",
  AZURE_LOGOUT: "logout",
  GENERATE: "generate",
  GET_OUTPUT_PATH: "get-output-path",
  GET_USER_STATUS: "get-user-status",
  NAME_COSMOS: "name-cosmos",
  NAME_FUNCTIONS: "name-functions",
  PROJECT_PATH_VALIDATION: "project-path-validation",
  SUBSCRIPTION_DATA_COSMOS: "subscription-data-for-cosmos",
  SUBSCRIPTION_DATA_FUNCTIONS: "subscription-data-for-functions",
  TRACK_PAGE_SWITCH: "track-page-switch",
  GEN_STATUS_MESSAGE: "update-status-message",
  GEN_STATUS: "update-status",
  GET_PORT: "get-port",
  OPEN_PROJECT_IN_VSCODE: "open-project-vscode",
  GET_VERSIONS: "get-versions",
  CLOSE_WIZARD: "close-wizard",
  RESET_PAGES: "reset-pages",
  GET_PREVIEW_STATUS: "get-preview"
};

export {
  PRODUCTION,
  EXTENSION_MODULES,
  EXTENSION_COMMANDS,
  ROUTES,
  ROUTES_ARRAY,
  SERVICE_KEYS,
  WIZARD_CONTENT_INTERNAL_NAMES,
  INTL_MESSAGES,
  COSMOS_APIS,
  DEVELOPMENT
};
