import express from "express";
const router = express.Router();

import Game from "../models/game";

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

export default router;
