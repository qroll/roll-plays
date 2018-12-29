import "./env";

export const { LOG } = require("./log");
export const { DB } = require("./db");

export const SESSION = {
  SIGNING_KEY: 'cat blep'
}

export const inEnv = (envToCheck) => {
  if (Array.isArray(envToCheck)) {
    return envToCheck.includes(process.env.NODE_ENV);
  }
  return process.env.NODE_ENV === envToCheck;
}