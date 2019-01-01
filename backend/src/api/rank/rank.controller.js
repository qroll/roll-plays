import BaseController from "~/build/utils/BaseController";

import RankService from "./rank.service";

class RankController extends BaseController {
    constructor() {
        super();
        this.service = new RankService();
    }

    async retrieveRanks(req, res) {
        try {
            let ranks = await this.service.retrieveRanks();
            res.json({ ranks });
        } catch (err) {
            res.sendStatus(500);
        }
    }

    async createRank(req, res) {
        let { rank } = req.body;

        try {
            let createdRank = await this.service.createRank(rank);
            res.json(createdRank);
        } catch (err) {
            res.sendStatus(500);
        }
    }

    async updateRankById(req, res) {
        let rankId = req.params.id;
        let rank = req.body;

        try {
            let updatedRank = await this.service.updateRankById(rankId, rank);
            res.sendStatus(200);
        } catch (err) {
            res.sendStatus(500);
        }
    }
}

export default RankController;
