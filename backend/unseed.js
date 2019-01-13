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
        set.down(function(err) {
            if (err) {
                throw err;
            }
            console.log("Migrations successfully reset");
            mongoose.disconnect();
            knex.destroy();
        });
    }
);
