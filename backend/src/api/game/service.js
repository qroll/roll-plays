import Game from "~/src/models/game";

class GameService {
    async retrieveGames() {
        let games = await Game.find().exec();
        return games;
    }

    async createGame(game) {
        let createdGame = await Game.create(game);
    }
}

export default GameService;
