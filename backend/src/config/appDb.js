const APP_DB_HOST = process.env.APP_DB_HOST || "localhost";
const APP_DB_PORT = process.env.APP_DB_PORT || "";
const APP_DB_NAME = process.env.APP_DB_NAME || "rollplays";

export const APP_DB = {
    HOST: APP_DB_HOST,
    PORT: APP_DB_PORT,
    NAME: APP_DB_NAME,
    USERNAME: process.env.APP_DB_USERNAME,
    PASSWORD: process.env.APP_DB_PASSWORD
};
