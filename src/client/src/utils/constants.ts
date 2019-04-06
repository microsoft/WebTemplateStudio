const PAGE_DETAILS = "/PageDetail";
const SELECT_PROJECT_TYPE = "/SelectWebApp";
const SELECT_FRAMEWORKS = "/SelectFrameworks";
const SELECT_PAGES = "/SelectPages";
const AZURE_LOGIN = "/AzureLogin";
const REVIEW_AND_GENERATE = "/ReviewAndGenerate";
const WELCOME = "/";

const PRODUCTION = "production";

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

const PAGE_NAME_ERROR_MESSAGES = {
  DUPLICATE_NAME: "Name has to be unique",
  INVALID_REGEX:
    "Name may only contain letters, numbers, spaces, dashes or underscores",
  EMPTY_NAME: "Name cannot be empty",
  NAME_DOES_NOT_START_WITH_LETTER: "Page name may only start with letters"
};

const EMPTY_FIELD = (fieldId: string) => {
  return `${fieldId} field cannot be empty`;
};

// Define extension commands here that should be received from the extension
const EXTENSION_COMMANDS = {
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
  OPEN_PROJECT_IN_VSCODE: "open-project-vscode"
};

export {
  PRODUCTION,
  EXTENSION_COMMANDS,
  ROUTES,
  ROUTES_ARRAY,
  SERVICE_KEYS,
  WIZARD_CONTENT_INTERNAL_NAMES,
  PAGE_NAME_ERROR_MESSAGES,
  EMPTY_FIELD
};
