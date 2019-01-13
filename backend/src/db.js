import Knex from "knex";
import { Model } from "objection";

import { APP_DB } from "~/src/config";

// Initialize knex
const knex = Knex({
    client: "pg",
    connection: {
        host: APP_DB.HOST,
        user: APP_DB.USERNAME,
        password: APP_DB.PASSWORD,
        database: APP_DB.NAME
    }
});

// Give the knex object to objection
Model.knex(knex);

export { knex, Model };
