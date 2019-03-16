import Post from "~/src/models/post";

class FeedService {
    async retrievePosts() {
        let posts = await Post.query();
        return posts.map(post => ({ id: post.id, ...post.data }));
    }

    async createPost(post) {
        let createdPost = await Post.query().insert({ data: post });
        return createdPost;
    }
}

export default FeedService;
