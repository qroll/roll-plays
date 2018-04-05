const mongoose = require("./mongoose.js");
const Schema = mongoose.Schema;

let RankSchema = new Schema({
    name: { type: String, unique: true },
    description: { type: String },
    games: { type: Array, default: [] }
});

const Rank = mongoose.model("Rank", RankSchema);
module.exports = Rank;
