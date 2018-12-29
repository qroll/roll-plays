import mongoose from "mongoose";
import bluebird from "bluebird";
mongoose.Promise = bluebird;

import { DB } from "../config";

let options = {
    keepAlive: 100,
    connectTimeoutMS: 30000,
    socketTimeoutMS: 30000,
    reconnectTries: 3
};

mongoose.connect(DB.URI, options);

mongoose.connection.on("error", function (error) {
    console.log("mongoose err", error);
});

mongoose.connection.on("connected", function () {
    console.log("Connection established to MongoDB");
});

mongoose.connection.on("reconnected", function () {
    console.log("Reconnected to MongoDB");
});

export default mongoose;
