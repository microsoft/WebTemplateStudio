var constants = {};

constants.port = process.env.PORT || "3001";
constants.endpoint = {};
constants.endpoint.list = "/list";
constants.endpoint.grid = "/grid";
constants.endpoint.masterdetail = "/masterdetail";

module.exports = constants;
