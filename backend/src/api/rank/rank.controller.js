import BaseController from "~/src/utils/BaseController";

import RankService from "./rank.service";

class RankController extends BaseController {
    constructor() {
        super();
        this.service = new RankService();
    }

    async retrieveRanks(req, res) {
        try {
            let ranks = await this.service.retrieveGamesByRanking();
            this.success(res, ranks);
        } catch (err) {
            this.failure(res, err);
        }
    }

    async createRank(req, res) {
        let { rank } = req.body;

        try {
            let createdRank = await this.service.createRank(rank);
            this.success(res, createdRank);
        } catch (err) {
            this.failure(res, err);
        }
    }

    async updateGameRanks(req, res) {
        let { rankedGames, unrankedGames } = req.body;

        try {
            await this.service.rankGames(rankedGames);
            await this.service.derankGames(unrankedGames);
            this.success(res, true);
        } catch (err) {
            this.failure(res, err);
        }
    }

    async updateRankById(req, res) {
        let rankId = req.params.id;
        let rank = req.body;

        try {
            let updatedRank = await this.service.updateRankById(rankId, rank);
            this.success(res, updatedRank);
        } catch (err) {
            this.failure(res, err);
        }
    }
}

export default RankController;
