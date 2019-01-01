import Rank from "~/src/models/rank";

class RankService {
    async retrieveRanks(req, res) {
        let ranks = await Rank.find().exec();
        return ranks;
    }

    async createRank(rank) {
        let createdRank = await Rank.create(rank);
        return createdRank;
    }

    async updateRankById(rankId, rank) {
        let updatedRank = await Rank.findByIdAndUpdate(rankId, rank);
        return updatedRank;
    }
}

export default RankService;
