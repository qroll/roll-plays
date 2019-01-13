import migrate from "migrate";
import mongoose from "~/src/models/mongoose";
import { knex } from "~/src/db";

migrate.load(
    {
        stateStore: ".migrate",
        migrationsDirectory: require("path").resolve(__dirname, "migrations")
    },
    function(err, set) {
        if (err) {
            throw err;
        }
        set.up(function(err) {
            if (err) {
                throw err;
            }
            console.log("Migrations successfully completed");
            mongoose.disconnect();
            knex.destroy();
        });
    }
);
