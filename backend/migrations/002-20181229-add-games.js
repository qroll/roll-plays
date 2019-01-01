"use strict";

import request from "request-promise";

import Game from "~/src/models/game";
import { STEAM_API } from "~/src/config";

const games = [
    { title: "Demo Game 1", inLibrary: true, status: "completed" },
    { title: "Demo Game 2", inLibrary: true, status: "completed" },
    { title: "Demo Game 3", inLibrary: true, status: "completed" },
    { title: "Demo Game 4", inLibrary: true, status: "completed" }
];

module.exports.up = async function(next) {
    await Game.create(games);

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

    await Game.create(steamLibrary);

    next();
};

module.exports.down = function(next) {
    return Game.deleteMany({})
        .exec()
        .then(() => next());
};
