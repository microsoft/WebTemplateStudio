const PAGE_DETAILS = "/PageDetail";
const SELECT_PROJECT_TYPE = "/SelectWebApp";
const SELECT_FRAMEWORKS = "/SelectFrameworks";
const SELECT_PAGES = "/SelectPages";
const AZURE_LOGIN = "/AzureLogin";
const REVIEW_AND_GENERATE = "/ReviewAndGenerate";

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

const WIZARD_CONTENT_INTERNAL_NAMES = {
  NODE_JS: "NodeJS",
  REACT_JS: "ReactJS",
  MASTER_DETAIL: "wts.Page.React.MasterDetail",
  CONTENT_GRID: "wts.Page.React.Grid",
  LIST: "wts.Page.ReactNode.LongList",
  BLANK_PAGE: "wts.Page.ReactNode.BlankPage",
  FULL_STACK_APP: "FullStackWebApp",
  REST_API: "RestAPI",
  AZURE_FUNCTIONS: "AzureFunctions",
  COSMOS_DB: "Cosmos"
};

export { ROUTES, ROUTES_ARRAY, WIZARD_CONTENT_INTERNAL_NAMES };
