import express from "express";

import RankController from "./rank.controller";

const router = express.Router();
const controller = new RankController();

router.get("/", (req, res) => {
    controller.retrieveRanks(req, res);
});

router.post("/", (req, res) => {
    controller.createRank(req, res);
});

router.put("/games", (req, res) => {
    controller.updateGameRanks(req, res);
});

router.put("/:id", (req, res) => {
    controller.updateRankById(req, res);
});

export default router;
