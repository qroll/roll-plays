import Post from "~/src/models/post";

class FeedService {
    async retrievePosts() {
        let posts = await Post.query();
        return posts;
    }

    async createPost(post) {
        let createdPost = await Post.query().insert(post);
        return createdPost;
    }
}

export default FeedService;
