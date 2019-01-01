import express from "express";

import auth from "./auth";
import game from "./game";
import post from "./post";
import rank from "./rank";

const router = express.Router();

router.use("/auth", auth);
router.use("/game", game);
router.use("/post", post);
router.use("/rank", rank);

export default router;
