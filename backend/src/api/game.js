const express = require("express");

const router = express.Router();

const Game = require("../models/game");

router.get("/", (req, res) => {
    Game.find()
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(500);
        });
});

router.post("/", (req, res) => {
    let game = req.body;

    Game.create(game)
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(500);
        });
});

module.exports = router;
