import ApiManager from "src/utils/apiManager";

export const postToFeed = post => {
    return ApiManager.post("/post", { post });
};

export const retrieveFeed = () => {
    return ApiManager.get("/post").then(res => res.data.data);
};
