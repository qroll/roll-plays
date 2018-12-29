'use strict'

import Rank from "~/src/models/rank";

const games = [
  { title: "Portal", inLibrary: true, status: "completed" },
  { title: "The Witness", inLibrary: true, status: "completed" },
  { title: "Prey (2017)", inLibrary: true, status: "completed" },
  { title: "Gunpoint", inLibrary: true, status: "completed" }
];

module.exports.up = function (next) {
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
  ])
    .then(() => next());
}

module.exports.down = function (next) {
  Rank.deleteMany({})
    .exec()
    .then(() => next());
}
