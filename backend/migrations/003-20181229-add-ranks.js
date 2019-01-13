"use strict";

import { knex } from "~/src/db";
import Rank from "~/src/models/rank";

module.exports.up = async function(next) {
    await knex.schema.createTable("rank", table => {
        table.increments();
        table.string("name");
        table.string("description");
    });

    let ranks = [
        {
            id: 1,
            name: "Great",
            description:
                "Fantastic gameplay or narrative elements that left a deep impression"
        },
        {
            id: 2,
            name: "Entertaining",
            description: "Solid mechanics, time well spent"
        }
    ];

    await Rank.query().insert(ranks);

    next();
};

module.exports.down = async function(next) {
    await knex.schema.dropTableIfExists("rank");
    next();
};
