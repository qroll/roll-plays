import express from "express";

import GameController from "./controller";

const router = express.Router();
const controller = new GameController();

router.get("/", (req, res) => {
    controller.retrieveGames(req, res);
});

router.post("/", (req, res) => {
    controller.createGame(req, res);
});

export default router;
