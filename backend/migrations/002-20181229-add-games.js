'use strict'

import Game from "~/src/models/game";

const games = [
  { title: "Portal", inLibrary: true, status: "completed" },
  { title: "The Witness", inLibrary: true, status: "completed" },
  { title: "Prey (2017)", inLibrary: true, status: "completed" },
  { title: "Gunpoint", inLibrary: true, status: "completed" }
];

module.exports.up = function (next) {
  return Game.create(games)
    .then(() => next());
}

module.exports.down = function (next) {
  Game.deleteMany({})
    .exec()
    .then(() => next());
}
