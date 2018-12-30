import Game from "~/src/models/game";

class GameController {
    async retrieveGames(req, res) {
        try {
            let games = await Game.find();
            res.json({ games });
        } catch (err) {
            res.sendStatus(500);
        }
    }

    async createGame(req, res) {
        let { game } = req.body;

        try {
            let createdGame = await Game.create(game);
            res.json(createdGame);
        } catch (err) {
            res.sendStatus(500);
        }
    }
}

export default GameController;
