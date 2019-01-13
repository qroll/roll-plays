import { Model } from "~/src/db";

export default class GameModel extends Model {
    static tableName = "game";

    static jsonSchema = {
        type: "object",
        required: ["title", "inLibrary"],

        properties: {
            id: { type: "integer" },
            appId: { type: ["integer", "string"] },
            title: { type: "string" },
            releaseDate: { type: "string", format: "date" },
            inLibrary: { type: "boolean" },
            status: {
                type: "string",
                enum: ["completed", "played", "unplayed"]
            }
        }
    };
}
