import BaseController from "~/src/utils/BaseController";

import GameService from "./service";

class GameController extends BaseController {
    constructor() {
        super();
        this.service = new GameService();
    }

    async retrieveGames(req, res) {
        try {
            let games = await this.service.retrieveGames();
            this.success(res, { games });
        } catch (err) {
            this.failure(res, err);
        }
    }

    async createGame(req, res) {
        try {
            let { game } = req.body;
            let createdGame = await this.service.createGame(game);
            this.success(res, { createdGame });
        } catch (err) {
            this.failure(res, err);
        }
    }
}

export default GameController;
