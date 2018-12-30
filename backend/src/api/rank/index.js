import express from "express";

import RankController from "./controller";

const router = express.Router();
const controller = new RankController();

router.get("/", controller.retrieveRanks);

router.post("/", controller.createRank);

router.put("/:id", controller.updateRankById);

export default router;
