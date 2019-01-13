import { Model } from "~/src/db";

export default class PostModel extends Model {
    static tableName = "post";

    static jsonSchema = {
        type: "object",

        properties: {
            id: { type: "integer" },
            data: {
                type: "object",
                properties: {
                    body: { type: "string" },
                    games: { type: "array" },
                    tags: { type: "array" }
                }
            }
        }
    };
}
