import { CONSTANTS } from "../../constants";
const Url = require("url-parse");

export namespace ConnectionString {
  export function parseConnectionString(connectionString: string): string {
    if (
      connectionString
        .toLowerCase()
        .startsWith(CONSTANTS.SQL_CONNECTION_STRING_PREFIX)
    ) {
      const [origin, primaryKey] = connectionString
        .split(";")
        .map(str => str.substr(str.indexOf("=") + 1));

      return CONSTANTS.CONNECTION_STRING_SQL(origin, primaryKey);
    } else {
      const cosmosConnectionString = Url(connectionString);
      return CONSTANTS.CONNECTION_STRING_MONGO(
        cosmosConnectionString.username,
        cosmosConnectionString.password,
        cosmosConnectionString.origin
      );
    }
  }
}
