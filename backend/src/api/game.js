import express from "express";
const router = express.Router();
import validator from "../utils/validator";
import moment from "moment";

import Game from "../models/game";

router.get("/", (req, res) => {
    Game.find()
        .then(games => {
            res.json({ games });
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(500);
        });
});

router.post("/", (req, res) => {
    let { game } = req.body;

    Game.create(game)
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(500);
        });
});

export const validate = game => {
    const constraints = {
        appId: value => value.match(/^[a-zA-Z0-9]+$/),
        title: { message: "is required", rule: value => !!value },
        releaseDate: [
            { message: "is required", rule: value => !!value },
            value => moment(value, "YYYYMMDD").isValid()
        ]
    };

    let result = validator(game, constraints);

    return result;
    /*
    if (typeof game !== "object") {
        throw new Exception("");
    }

    const constraints = {
        appId: {},
        title: { presence: { allowEmpty: false }, format: validator.isString },
        releaseDate: { presence: true, format: validator.isDate },
        inLibrary: { presence: true, format: validator.isBoolean },
        status: {
            presence: true,
            inclusion: {
                within: ["completed", "played", "unplayed"]
            }
        }
    };
    let attributes = validator.cleanAttributes(game, constraints);
    let errors = validator.validate(attributes, constraints);

    let { appID, title, releaseDate, inLibrary, status } = game;

    title = title.trim();

    // bla bla bla
    */
};

export default router;
