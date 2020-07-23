import { CONSTANTS } from "../../constants/constants";
const Url = require("url-parse");

interface ConnectionStringSqlData {
  account: string;
  primaryKey: string;
}

export namespace ConnectionString {
  export function parseConnectionString(connectionString: string): string {
    if (isCosmosSQLConnectionString(connectionString)) {
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

  export function getConnectionStringSqlData(connectionString: string): ConnectionStringSqlData {
    const [account, primaryKey] = connectionString
        .split(";")
        .map(str => str.substr(str.indexOf("=") + 1));

      return {account, primaryKey};    
  }

  export function isCosmosSQLConnectionString (connectionString: string): boolean {
    return connectionString
      .toLowerCase()
      .startsWith(CONSTANTS.SQL_CONNECTION_STRING_PREFIX);
  }
}
