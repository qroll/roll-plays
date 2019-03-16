import ApiManager from "src/utils/apiManager";

export const retrieveRanks = () => {
    return ApiManager.get("/rank").then(res => {
        return res.data.data;
    });
};

export const createRank = rank => {
    return ApiManager.post("/rank", rank);
};

export const editRank = rank => {
    return ApiManager.put("/rank", rank);
};
