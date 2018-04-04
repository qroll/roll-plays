import mongoose from "./mongoose";
const Schema = mongoose.Schema;

let GameSchema = new Schema(
    {
        appID: { type: String, unique: true },
        title: { type: String, required: true },
        releaseDate: { type: String },
        inLibrary: { type: Boolean, required: true },
        purchasePrice: { type: String },
        inBundle: { type: Boolean },
        status: {
            type: String,
            required: true,
            enum: ["completed", "played", "unplayed"]
        },
        rating: { type: String }
    },
    {
        timestamps: true,
        strict: false
    }
);

const Game = mongoose.model("Game", GameSchema);
module.exports = Game;
