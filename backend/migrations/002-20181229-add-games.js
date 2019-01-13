"use strict";

import request from "request-promise";

import { knex } from "~/src/db";
import Game from "~/src/models/game";
import { STEAM_API } from "~/src/config";

const games = [
    { id: 1, title: "Demo Game 1", inLibrary: true, status: "completed" },
    { id: 2, title: "Demo Game 2", inLibrary: true, status: "completed" },
    { id: 3, title: "Demo Game 3", inLibrary: true, status: "completed" },
    { id: 4, title: "Demo Game 4", inLibrary: true, status: "completed" }
];

module.exports.up = async function(next) {
    await knex.schema.createTable("game", table => {
        table.increments();
        table.string("appId");
        table.string("title");
        table.date("releaseDate");
        table.boolean("inLibrary");
        table.enum("status", ["completed", "played", "unplayed"]);
    });

    await Game.query().insert(games);

    await knex.raw(`
        SELECT 
        pg_catalog.setval(pg_get_serial_sequence('game', 'id'),
        (SELECT MAX(id) FROM game)+1);`);

    const options = {
        json: true
    };
    let response = await request.get(
        `http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${
            STEAM_API.API_KEY
        }&steamid=${
            STEAM_API.USER_ID
        }&format=json&include_appinfo=1&include_played_free_games=1`,
        options
    );

    let steamLibrary = response.response.games.map(game => {
        return {
            appId: game.appid,
            title: game.name,
            inLibrary: true
        };
    });

    await Game.query().insert(steamLibrary);

    next();
};

module.exports.down = async function(next) {
    await knex.schema.dropTableIfExists("game");
    next();
};
