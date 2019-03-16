import ApiManager from "src/utils/apiManager";

export const postToFeed = post => {
    return ApiManager.post("/post", { post });
};

export const retrieveFeed = () => {
    let posts = ApiManager.get("/post").then(res => res.data.data);
    let games = ApiManager.get("/game").then(res =>
        res.data.data.reduce((acc, game) => {
            acc[game.id] = game;
            return acc;
        }, {})
    );

    return Promise.all([posts, games]).then(([posts, games]) => {
        return posts.map(post => {
            post.games = post.games.map(gameId => {
                return { id: gameId, title: games[gameId].title };
            });
            return post;
        });
    });
};
