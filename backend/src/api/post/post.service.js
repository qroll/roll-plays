import Post from "~/src/models/post";
import BaseController from "~/src/utils/BaseController";

class FeedService {
    async retrievePosts() {
        let posts = await Post.find()
            .populate("games")
            .exec();
        return posts;
    }

    async createPost(post) {
        let createdPost = await Post.create(post);
        return createdPost;
    }
}

export default FeedService;
