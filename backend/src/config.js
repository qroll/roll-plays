import dotenv from "dotenv";
dotenv.config();

let dbConnectionString = "mongodb://";
dbConnectionString += process.env.DB_HOST || "localhost";
if (process.env.DB_PORT) {
    dbConnectionString += ":" + process.env.DB_PORT;
}
dbConnectionString += "/" + (process.env.DB_NAME || "placeholder_db");

// console.log("dbConnectionString", dbConnectionString);

export { dbConnectionString };
