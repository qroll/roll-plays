import Rank from "~/src/models/rank";
import Game from "~/src/models/game";
import GameRank from "~/src/models/gameRank";
import { knex } from "~/src/db";

class RankService {
    async retrieveGamesByRanking() {
        let rankedGames = await Rank.query().eager("games");
        let unrankedGames = await Game.query().whereNotIn(
            "id",
            GameRank.query().select("gameId")
        );
        return { rankedGames, unrankedGames };
    }

    async createRank(rank) {
        let createdRank = await Rank.query().insert(rank);
        return createdRank;
    }

    async updateRankById(rankId, rank) {
        let updatedRank = await Rank.query()
            .update(rank)
            .where({ id: rankId });
        return updatedRank;
    }

    async rankGames(ranks) {
        if (!ranks.length) {
            return true; // nothing to insert
        }

        let values = ranks.reduce((v, rank) => {
            v.push(rank.rankId, rank.gameId);
            return v;
        }, []);

        let gameIdCol = knex.ref("gameId");
        let rankIdCol = knex.ref("rankId");
        await knex.raw(
            `INSERT INTO ${knex.ref("gameRank")} (${rankIdCol}, ${gameIdCol})
            VALUES ${ranks.map(() => `(?,?)`).join(",")}
            ON CONFLICT (${rankIdCol}, ${gameIdCol}) DO UPDATE
            SET ${rankIdCol}=${knex.raw("??", "gameRank.rankId")}
            `,
            values
        );

        return true;
    }

    async derankGames(gameIds) {
        await GameRank.query()
            .delete()
            .whereIn("gameId", gameIds);
        return true;
    }
}

export default RankService;
