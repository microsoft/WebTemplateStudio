import { CONSTANTS } from "../../constants/constants";
const Url = require("url-parse");

interface ConnectionStringSqlData {
  origin: string;
  primaryKey: string;
}

interface ConnectionStringMongoData {
  origin: string;
  username: string;
  password: string;
}

export namespace ConnectionString {
  export function getConnectionStringSqlData(connectionString: string): ConnectionStringSqlData {
    const [origin, primaryKey] = connectionString.split(";").map((str) => str.substr(str.indexOf("=") + 1));

    return { origin, primaryKey };
  }

  export function getConnectionStringMongoData(connectionString: string): ConnectionStringMongoData {
    let url = Url(connectionString);

    return { origin: url.origin, username: url.username, password: url.password };
  }

  export function isCosmosSQLConnectionString(connectionString: string): boolean {
    return connectionString.toLowerCase().startsWith(CONSTANTS.SQL_CONNECTION_STRING_PREFIX);
  }
}
