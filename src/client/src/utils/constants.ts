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
    REVIEW_AND_GENERATE,
}

// Presents the routes in the order of the wizard
const ROUTES_ARRAY = [
    SELECT_PROJECT_TYPE,
    SELECT_FRAMEWORKS,
    SELECT_PAGES,
    AZURE_LOGIN,
    REVIEW_AND_GENERATE
];

export { ROUTES, ROUTES_ARRAY };