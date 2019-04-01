const CONSTANTS = {};

CONSTANTS.PORT = process.env.PORT || "3001";
CONSTANTS.ENDPOINT = {};
CONSTANTS.ENDPOINT.LIST = "/list";
CONSTANTS.ENDPOINT.GRID = "/grid";
CONSTANTS.ENDPOINT.MASTERDETAIL = "/masterdetail";

/*
 * Engine: Only merge if SQL or MONGO is selected
 */
CONSTANTS.COSMOS = {};

/*
 * Engine: Only merge if SQL is selected
 */
CONSTANTS.COSMOS.DATABASE = "List";
CONSTANTS.COSMOS.CONTAINER = "ListItems";

/*
 * Engine: Only merge if MONGO is selected
 */
CONSTANTS.COSMOS.COLLECTION = "ListItems";

module.exports = CONSTANTS;
