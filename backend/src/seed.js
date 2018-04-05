import User from "./models/user";
import Game from "./models/game";
import Rank from "./models/rank";

User.find({})
    .exec()
    .then(users => {
        if (users && users.length === 0) {
            console.log("there are no users in database");
            console.log("proceed to seed database with default user");
            return User.create({
                username: "superuser",
                password: "superuser",
                roles: ["superuser"]
            }).then(user => {
                console.log("default user created");
            });
        }
    })
    .catch(err => {
        console.log(err);
    });

Game.find()
    .exec()
    .then(games => {
        if (games && games.length === 0) {
            console.log("there are no games in database");
            console.log("proceed to seed database with default games");
            return Game.create([
                { title: "Portal", inLibrary: true, status: "completed" },
                { title: "The Witness", inLibrary: true, status: "completed" },
                { title: "Prey (2017)", inLibrary: true, status: "completed" },
                { title: "Gunpoint", inLibrary: true, status: "completed" }
            ]);
        }
    })
    .then(games => {
        Rank.create([
            {
                name: "Great",
                description:
                    "Fantastic gameplay or narrative elements that left a deep impression",
                games: [games[0]._id, games[1]._id, games[2]._id]
            },
            {
                name: "Entertaining",
                description: "Solid mechanics, time well spent",
                games: [games[3]._id]
            }
        ]);
    })
    .catch(err => {
        console.log(err);
    });
