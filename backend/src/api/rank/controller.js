import Rank from "~/src/models/rank";

class RankController {
    async retrieveRanks(req, res) {
        try {
            let ranks = await Rank.find().exec();
            res.json({ ranks });
        } catch (err) {
            res.sendStatus(500);
        }
    }

    async createRank(req, res) {
        let { rank } = req.body;

        try {
            let createdRank = await Rank.create(rank);
            res.json(createdRank);
        } catch (err) {
            res.sendStatus(500);
        }
    }

    async updateRankById(req, res) {
        let rankId = req.params.id;
        let rank = req.body;

        try {
            let updatedRank = await Rank.findByIdAndUpdate(rankId, rank);
            res.sendStatus(200);
        } catch (err) {
            res.sendStatus(500);
        }
    }
}

export default RankController;
