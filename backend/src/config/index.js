import "./env";

export const { APP_DB } = require("./appDb");

export const LOG = {
    LOG_LEVEL: process.env.LOG_LEVEL
};

const { SESSION_DB } = require("./sessionDb");

export const SESSION = {
    SIGNING_KEY: "cat blep",
    DB_URI: SESSION_DB.URI
};

export const STEAM_API = {
    API_KEY: process.env.STEAM_API_KEY,
    USER_ID: process.env.STEAM_API_USER_ID
};

export const inEnv = envToCheck => {
    if (Array.isArray(envToCheck)) {
        return envToCheck.includes(process.env.NODE_ENV);
    }
    return process.env.NODE_ENV === envToCheck;
};
