"use strict";

import { knex } from "~/src/db";

module.exports.up = async function(next) {
    await knex.schema.createTable("post", table => {
        table.increments();
        table.jsonb("data");
    });

    next();
};

module.exports.down = async function(next) {
    await knex.schema.dropTableIfExists("post");
    next();
};
