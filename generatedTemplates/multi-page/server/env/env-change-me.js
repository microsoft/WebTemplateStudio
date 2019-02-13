//Replace with your keys and rename file to env.js
COSMOSDB_CONNSTR =
  "mongodb://{cosmos-user}.documents.azure.com:{dbport}/{dbname}";
COSMODDB_USER = "cosmos-user";
COSMOSDB_PASSWORD = "cosmos-secret-key";

module.exports = {
  COSMOSDB_CONNSTR,
  COSMOSDB_USER,
  COSMOSDB_PASSWORD
};
