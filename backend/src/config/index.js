import "./env";

export const { DB } = require("./db");

export const LOG = {
    LOG_LEVEL: process.env.LOG_LEVEL
};

export const SESSION = {
    SIGNING_KEY: "cat blep"
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
