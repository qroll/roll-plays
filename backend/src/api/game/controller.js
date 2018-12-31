import Game from "~/src/models/game";
import BaseController from "~/src/utils/BaseController";

class GameController extends BaseController {
    async retrieveGames(req, res) {
        try {
            let games = await Game.find().exec();
            this.success(res, { games });
        } catch (err) {
            this.failure(res, err);
        }
    }

    async createGame(req, res) {
        try {
            let { game } = req.body;
            let createdGame = await Game.create(game);
            this.success(res, { createdGame });
        } catch (err) {
            this.failure(res, err);
        }
    }
}

export default GameController;
