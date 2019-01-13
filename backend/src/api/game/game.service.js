import Game from "~/src/models/game";

class GameService {
    async retrieveGames() {
        let games = await Game.query();
        return games;
    }

    async createGame(game) {
        let createdGame = await Game.query().insert(game);
    }

    async editGames(games) {
        return true;
        // return Promise.all(
        //     games.map(game => {
        //         if (game.isDeleted) {
        //             return Game.findOneAndDelete(
        //                 { _id: game._id },
        //                 { session }
        //             ).exec();
        //         }

        //         let fields = {
        //             inLibrary: game.inLibrary,
        //             status: game.status
        //         };
        //         return Game.updateOne(
        //             { _id: game._id },
        //             { $set: fields },
        //             { session }
        //         ).exec();
        //     })
        // );
    }
}

export default GameService;
