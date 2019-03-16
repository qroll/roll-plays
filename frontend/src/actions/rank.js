import { normalize, schema } from "normalizr";

import ApiManager from "src/utils/apiManager";

export const retrieveRanks = () => {
    return ApiManager.get("/rank")
        .then(res => {
            let ranks = res.data.data;
            return ranks;
        })
        .then(normalizeRanks);
};

export const createRank = rank => {
    return ApiManager.post("/rank", rank);
};

export const editRank = rank => {
    return ApiManager.put("/rank", rank);
};

export const editGamesInRanks = rankInfo => {
    let rankedGames = [];
    let unrankedGames = [];

    Object.values(rankInfo).forEach(ranking => {
        if (ranking.id < 0) {
            unrankedGames = ranking.games;
        } else {
            ranking.games.forEach(game => {
                rankedGames.push({ rankId: ranking.id, gameId: game });
            });
        }
    });

    return ApiManager.put("/rank/games", { rankedGames, unrankedGames });
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
        rankInfo: {
            ...normalizedRanks.entities.ranks,
            "-1": { id: "-1", name: "Unranked", games: normalizedGames.result }
        },
        games: {
            ...normalizedRanks.entities.games,
            ...normalizedGames.entities.games
        }
    };
};
