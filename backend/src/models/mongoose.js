import mongoose from "mongoose";
import bluebird from "bluebird";

import Logger from "~/src/utils/Logger";

mongoose.Promise = bluebird;

import { DB } from "../config";

let options = {
    keepAlive: 100,
    connectTimeoutMS: 30000,
    socketTimeoutMS: 30000,
    reconnectTries: 3,
    useNewUrlParser: true,
    bufferCommands: false,
    bufferMaxEntries: 0
};

mongoose.connect(
    DB.URI,
    options
);

mongoose.connection.on("error", function(error) {
    Logger.error(error, "Error connecting to MongoDB");
    throw error;
});

mongoose.connection.on("connected", function() {
    Logger.info("Connection established to MongoDB");
});

mongoose.connection.on("reconnected", function() {
    Logger.info("Reconnected to MongoDB");
});

export default mongoose;
