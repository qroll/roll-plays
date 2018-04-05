const express = require("express");

const router = express.Router();

const Rank = require("../models/rank");

router.get("/", (req, res) => {
    Rank.find()
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(500);
        });
});

router.post("/", (req, res) => {
    let rank = req.body;

    Rank.create(rank)
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(500);
        });
});

router.put("/:id", (req, res) => {
    let rankId = req.params.id;
    let rank = req.body;

    Rank.findByIdAndUpdate(rankId, rank)
        .then(data => {
            res.sendStatus(200);
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(500);
        });
});

module.exports = router;
