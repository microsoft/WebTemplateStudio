const CONSTANTS = {};
//{[{
CONSTANTS.COSMOS = {};
//}]}
CONSTANTS.PORT = process.env.PORT || "3001";
//^^
//{[{
CONSTANTS.COSMOS.DATABASE = "List";
CONSTANTS.COSMOS.CONTAINER = "ListItems";
//}]}
module.exports = CONSTANTS;
