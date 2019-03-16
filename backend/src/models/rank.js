import { Model } from "~/src/db";
import GameModel from "./game";
import GameRankModel from "./gameRank";

export default class RankModel extends Model {
    static tableName = "rank";

    static jsonSchema = {
        type: "object",
        required: ["name"],

        properties: {
            id: { type: "integer" },
            name: { type: "string" },
            description: { type: "string" }
        }
    };

    static relationMappings = {
        games: {
            relation: Model.ManyToManyRelation,
            modelClass: GameModel,
            join: {
                from: "rank.id",
                through: {
                    modelClass: GameRankModel,
                    from: "gameRank.rankId",
                    to: "gameRank.gameId"
                },
                to: "game.id"
            }
        }
    };
}
