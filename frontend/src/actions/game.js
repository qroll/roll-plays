import ApiManager from "src/utils/apiManager";

export const retrieveGames = () => {
    return ApiManager.get("/game").then(res => res.data.data);
};

export const createGame = game => {
    return ApiManager.post("/game", game);
};

export const editGames = games => {
    return ApiManager.put("/game", games);
};
