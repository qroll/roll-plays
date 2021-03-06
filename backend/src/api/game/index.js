import express from "express";

import GameController from "./game.controller";

const router = express.Router();
const controller = new GameController();

router.get("/", (req, res) => {
    controller.retrieveGames(req, res);
});

router.post("/", (req, res) => {
    controller.createGame(req, res);
});

router.put("/", (req, res) => {
    controller.editGames(req, res);
});

router.get("/activity", (req, res) => {
    controller.retrieveActivity(req, res);
});

export default router;
