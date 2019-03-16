import { normalize, schema } from "normalizr";

import ApiManager from "src/utils/apiManager";

export const retrieveRanks = () => {
    return ApiManager.get("/rank").then(res => {
        let ranks = res.data.data;
        return ranks;
    });
};

export const createRank = rank => {
    return ApiManager.post("/rank", rank);
};

export const editRank = rank => {
    return ApiManager.put("/rank", rank);
};

export const normalizeRanks = ranks => {
    let { rankedGames, unrankedGames } = ranks;

    const gameSchema = new schema.Entity("games");
    const rankSchema = new schema.Entity("ranks", {
        games: [gameSchema]
    });
    const gameListSchema = [gameSchema];
    const rankListSchema = [rankSchema];

    let normalizedRanks = normalize(rankedGames, rankListSchema);
    let normalizedGames = normalize(unrankedGames, gameListSchema);

    return {
        rankInfo: normalizedRanks.entities.ranks,
        games: normalizedRanks.entities.games,
        unrankedGames: normalizedGames.entities.games
    };
};
