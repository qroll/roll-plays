import Rank from "~/src/models/rank";
import Game from "~/src/models/game";
import GameRank from "~/src/models/gameRank";

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
}

export default RankService;
