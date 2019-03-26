const CONSTANTS = {};

CONSTANTS.PORT = process.env.PORT || "3001";
CONSTANTS.ENDPOINT = {};
CONSTANTS.ENDPOINT.LIST = "/list";
CONSTANTS.ENDPOINT.GRID = "/grid";
CONSTANTS.ENDPOINT.MASTERDETAIL = "/masterdetail";

/*
 * Engine: If list isn't selected, change the values to Table (for database) and Items (for container)
 */
CONSTANTS.COSMOS = {};
CONSTANTS.COSMOS.DATABASE = "List";
CONSTANTS.COSMOS.CONTAINER = "ListItems";

module.exports = CONSTANTS;
