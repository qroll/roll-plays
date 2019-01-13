const SESSION_DB_HOST = process.env.SESSION_DB_HOST || "localhost";
const SESSION_DB_PORT = process.env.SESSION_DB_PORT || "";
const SESSION_DB_NAME = process.env.SESSION_DB_NAME || "rollplays";

let dbConnectionUri = "mongodb://";
dbConnectionUri += SESSION_DB_HOST;
dbConnectionUri += ":" + SESSION_DB_PORT;
dbConnectionUri += "/" + SESSION_DB_NAME;

export const SESSION_DB = {
    URI: dbConnectionUri
};
