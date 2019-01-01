import mongoose from "./mongoose";
const Schema = mongoose.Schema;

let PostSchema = new Schema(
    {
        body: { type: String, required: true },
        games: [{ type: Schema.Types.ObjectId, ref: "Game" }],
        tags: { type: [], default: [] }
    },
    {
        timestamps: true,
        strict: false
    }
);

const Post = mongoose.model("Post", PostSchema);
module.exports = Post;
