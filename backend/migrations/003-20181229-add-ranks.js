"use strict";

import Game from "~/src/models/game";
import Rank from "~/src/models/rank";

module.exports.up = function(next) {
    return Game.find()
        .exec()
        .then(games => {
            return Rank.create([
                {
                    name: "Great",
                    description:
                        "Fantastic gameplay or narrative elements that left a deep impression",
                    games: [games[0]._id, games[1]._id, games[2]._id]
                },
                {
                    name: "Entertaining",
                    description: "Solid mechanics, time well spent",
                    games: [games[3]._id]
                }
            ]);
        })
        .then(() => next());
};

module.exports.down = function(next) {
    return Rank.deleteMany({})
        .exec()
        .then(() => next());
};
