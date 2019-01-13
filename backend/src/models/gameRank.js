import { Model } from "~/src/db";

export default class GameRankModel extends Model {
    static tableName = "gameRank";

    static jsonSchema = {
        type: "object",
        required: ["rankId", "gameId"],

        properties: {
            rankId: { type: "integer" },
            gameId: { type: "integer" }
        }
    };
}
