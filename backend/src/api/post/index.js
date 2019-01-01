import express from "express";

import FeedController from "./controller";

const router = express.Router();
const controller = new FeedController();

router.get("/", (req, res) => {
    controller.retrievePosts(req, res);
});

router.post("/", (req, res) => {
    controller.createPost(req, res);
});

export default router;
