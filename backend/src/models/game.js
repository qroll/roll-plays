import mongoose from "./mongoose";
const Schema = mongoose.Schema;

let GameSchema = new Schema(
    {
        appID: { type: String },
        title: { type: String, required: true },
        releaseDate: { type: String },
        inLibrary: { type: Boolean, required: true },
        status: {
            type: String,
            required: false,
            enum: ["completed", "played", "unplayed"]
        }
    },
    {
        timestamps: true,
        strict: false
    }
);

const Game = mongoose.model("Game", GameSchema);
module.exports = Game;
