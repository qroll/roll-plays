const DB_HOST = process.env.DB_HOST || "localhost";
const DB_PORT = process.env.DB_PORT || "";
const DB_NAME = process.env.DB_NAME || "rollplays";

let dbConnectionUri = "mongodb://";
dbConnectionUri += DB_HOST;
dbConnectionUri += ":" + DB_PORT;
dbConnectionUri += "/" + DB_NAME;

export const DB = {
    URI: dbConnectionUri
};
