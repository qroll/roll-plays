"use strict";

import { knex } from "~/src/db";
import GameRankModel from "~/src/models/gameRank";

module.exports.up = async function(next) {
    await knex.schema.createTable("gameRank", table => {
        table.increments();
        table.integer("rankId");
        table.integer("gameId");
    });

    let gameRanks = [
        {
            rankId: 1,
            gameId: 1
        },
        {
            rankId: 1,
            gameId: 2
        },
        {
            rankId: 1,
            gameId: 3
        },
        {
            rankId: 2,
            gameId: 4
        }
    ];

    await GameRankModel.query().insert(gameRanks);
    next();
};

module.exports.down = async function(next) {
    await knex.schema.dropTableIfExists("gameRank");
    next();
};
