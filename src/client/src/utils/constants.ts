import { defineMessages } from "react-intl";

const PAGE_DETAILS = "/PageDetail";
const SELECT_PROJECT_TYPE = "/SelectWebApp";
const SELECT_FRAMEWORKS = "/SelectFrameworks";
const SELECT_PAGES = "/SelectPages";
const AZURE_LOGIN = "/AzureLogin";
const REVIEW_AND_GENERATE = "/ReviewAndGenerate";
const WELCOME = "/";

const PRODUCTION = "production";

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
  WELCOME
};

// Presents the routes in the order of the wizard
const ROUTES_ARRAY = [
  WELCOME,
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

const WIZARD_CONTENT_INTERNAL_NAMES = {
  AZURE: "wts.Feature.Azure",
  AZURE_FUNCTIONS: "wts.Feature.Azure.AzureFunctions",
  BLANK_PAGE: "wts.Page.React.Blank",
  CONTENT_GRID: "wts.Page.React.Grid",
  COSMOS_DB: "wts.Feature.Azure.Cosmos",
  COSMOS_DB_MONGO: "wts.Feature.Azure.Cosmos.Mongo",
  COSMOS_DB_SQL: "wts.Feature.Azure.Cosmos.SQL",
  FULL_STACK_APP: "FullStackWebApp",
  LIST: "wts.Page.React.List",
  MASTER_DETAIL: "wts.Page.React.MasterDetail",
  NODE_JS: "NodeJS",
  REACT_JS: "ReactJS",
  REST_API: "RestAPI"
};

// Define extension commands here that should be received from the extension
const EXTENSION_COMMANDS = {
  AZURE_LOGIN: "login",
  AZURE_LOGOUT: "logout",
  GENERATE: "generate",
  GET_OUTPUT_PATH: "getOutputPath",
  GET_USER_STATUS: "getUserStatus",
  NAME_COSMOS: "name-cosmos",
  NAME_FUNCTIONS: "name-functions",
  PROJECT_PATH_VALIDATION: "project-path-validation",
  SUBSCRIPTION_DATA_COSMOS: "subscriptionDataForCosmos",
  SUBSCRIPTION_DATA_FUNCTIONS: "subscriptionDataForFunctions",
  TRACK_PAGE_SWITCH: "track-page-switch",
  GEN_STATUS_MESSAGE: "update-status-message",
  GEN_STATUS: "update-status",
  OPEN_PROJECT_IN_VSCODE: "open-project-vscode",
  GET_VERSIONS: "get-versions"
};

export {
  PRODUCTION,
  EXTENSION_COMMANDS,
  ROUTES,
  ROUTES_ARRAY,
  SERVICE_KEYS,
  WIZARD_CONTENT_INTERNAL_NAMES,
  INTL_MESSAGES
};
