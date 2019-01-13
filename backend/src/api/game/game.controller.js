import request from "request-promise";

import BaseController from "~/src/utils/BaseController";

import GameService from "./game.service";
import { STEAM_API } from "~/src/config";

const STEAM_USER_RECENTLY_PLAYED_URL = `http://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/?key=${
    STEAM_API.API_KEY
}&steamid=${STEAM_API.USER_ID}&format=json`;

class GameController extends BaseController {
    constructor() {
        super();
        this.service = new GameService();
    }

    async retrieveGames(req, res) {
        try {
            let games = await this.service.retrieveGames();
            this.success(res, games);
        } catch (err) {
            this.failure(res, err);
        }
    }

    async createGame(req, res) {
        try {
            let { game } = req.body;
            let createdGame = await this.service.createGame(game);
            this.success(res, createdGame);
        } catch (err) {
            this.failure(res, err);
        }
    }

    async editGames(req, res) {
        try {
            let { games } = req.body;
            await this.service.editGames(games);
            let updatedGames = await this.service.retrieveGames();
            this.success(res, updatedGames);
        } catch (err) {
            this.failure(res, err);
        }
    }

    async retrieveActivity(req, res) {
        try {
            const options = {
                json: true
            };
            let response = await request.get(
                STEAM_USER_RECENTLY_PLAYED_URL,
                options
            );
            let recentActivity = response.response.games.map(game => {
                return {
                    appId: game.appid,
                    title: game.name
                };
            });

            this.success(res, recentActivity);
        } catch (err) {
            this.failure(res, err);
        }
    }
}

export default GameController;
