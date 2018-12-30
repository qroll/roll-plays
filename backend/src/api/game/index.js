import express from "express";

import GameController from "./controller";

const router = express.Router();
const controller = new GameController();

router.get("/", controller.retrieveGames);

router.post("/", controller.createGame);

export default router;
