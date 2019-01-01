import BaseController from "~/src/utils/BaseController";

import FeedService from "./post.service";

class FeedController extends BaseController {
    constructor() {
        super();
        this.service = new FeedService();
    }

    async retrievePosts(req, res) {
        try {
            let posts = await this.service.retrievePosts();
            this.success(res, posts);
        } catch (err) {
            this.failure(res, err);
        }
    }

    async createPost(req, res) {
        try {
            let { post } = req.body;
            let createdPost = await this.service.createPost(post);
            this.success(res, createdPost);
        } catch (err) {
            this.failure(res, err);
        }
    }
}

export default FeedController;
