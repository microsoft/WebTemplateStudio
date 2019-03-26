const PAGE_DETAILS = "/PageDetail";
const SELECT_PROJECT_TYPE = "/SelectWebApp";
const SELECT_FRAMEWORKS = "/SelectFrameworks";
const SELECT_PAGES = "/SelectPages";
const AZURE_LOGIN = "/AzureLogin";
const REVIEW_AND_GENERATE = "/ReviewAndGenerate";

const PRODUCTION = "production";

const ROUTES = {
  PAGE_DETAILS,
  SELECT_PROJECT_TYPE,
  SELECT_FRAMEWORKS,
  SELECT_PAGES,
  AZURE_LOGIN,
  REVIEW_AND_GENERATE
};

// Presents the routes in the order of the wizard
const ROUTES_ARRAY = [
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
  NODE_JS: "NodeJS",
  REACT_JS: "ReactJS",
  MASTER_DETAIL: "wts.Page.React.MasterDetail",
  CONTENT_GRID: "wts.Page.React.Grid",
  LIST: "wts.Page.ReactNode.LongList",
  BLANK_PAGE: "wts.Page.Html.Blank",
  FULL_STACK_APP: "FullStackWebApp",
  REST_API: "RestAPI",
  AZURE_FUNCTIONS: "wts.Feature.Azure.AzureFunctions",
  COSMOS_DB: "wts.Feature.Azure.Cosmos"
};

const PAGE_NAME_ERROR_MESSAGES = {
  DUPLICATE_NAME: "page name has to be unique",
  INVALID_REGEX: "page name may only contain letters, numbers, and spaces",
  EMPTY_NAME: "name cannot be empty",
  NAME_STARTS_WITH_SPACE: "page name may only start with letters or numbers"
};

// Define extension commands here that should be received from the extension
const EXTENSION_COMMANDS = {
  GET_USER_STATUS: "getUserStatus",
  NAME_COSMOS: "name-cosmos",
  NAME_FUNCTIONS: "name-functions",
  GENERATE: "generate",
  PROJECT_PATH_AND_NAME_VALIDATION: "project-path-and-name-validation",
  SUBSCRIPTION_DATA_COSMOS: "subscriptionDataForCosmos",
  SUBSCRIPTION_DATA_FUNCTIONS: "subscriptionDataForFunctions"
};

export {
  PRODUCTION,
  EXTENSION_COMMANDS,
  ROUTES,
  ROUTES_ARRAY,
  SERVICE_KEYS,
  WIZARD_CONTENT_INTERNAL_NAMES,
  PAGE_NAME_ERROR_MESSAGES
};
