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
            name: "Woah",
            description:
                "Gameplay or narrative elements that left a deep impression on me"
        },
        {
            id: 2,
            name: "Entertaining",
            description: "Time well spent"
        },
        {
            id: 3,
            name: "I was whelmed",
            description: "It was okay, I guess"
        },
        {
            id: 4,
            name: "Nah",
            description: "Sorry"
        }
    ];

    await Rank.query().insert(ranks);

    next();
};

module.exports.down = async function(next) {
    await knex.schema.dropTableIfExists("rank");
    next();
};
