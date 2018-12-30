import express from "express";

import auth from "./auth";
import game from "./game";
import rank from "./rank";

const router = express.Router();

router.use("/auth", auth);
router.use("/game", game);
router.use("/rank", rank);

export default router;
