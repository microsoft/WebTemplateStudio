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
}

const WIZARD_CONTENT_INTERNAL_NAMES = {
  NODE_JS: "NodeJS",
  REACT_JS: "ReactJS",
  MASTER_DETAIL: "wts.Page.React.MasterDetail",
  CONTENT_GRID: "wts.Page.React.Grid",
  LIST: "wts.Page.ReactNode.LongList",
  BLANK_PAGE: "wts.Page.ReactNode.BlankPage",
  FULL_STACK_APP: "FullStackWebApp",
  REST_API: "RestAPI",
  AZURE_FUNCTIONS: "wts.Feature.Azure.AzureFunctions",
  COSMOS_DB: "wts.Feature.Azure.Cosmos"
};

// Define extension commands here that should be received from the extension
const EXTENSION_COMMANDS = {
  GET_USER_STATUS: "getUserStatus",
  NAME_COSMOS: "name-cosmos",
  NAME_FUNCTIONS: "name-functions",
  SUBSCRIPTION_DATA: "subscriptionData",
  GENERATE: "generate"
}

export { PRODUCTION, EXTENSION_COMMANDS, ROUTES, ROUTES_ARRAY, SERVICE_KEYS, WIZARD_CONTENT_INTERNAL_NAMES };
