import "./config";
import "./seed";

import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import connectMongoDB from "connect-mongodb-session";
const MongoDBStore = connectMongoDB(session);
import session from "express-session";
import passport from "passport";

import User from "./models/user";
import { dbConnectionString } from "./config";

//==============================================================

let app = express();

//==============================================================

// App sits behind a trusted reverse proxy such as nginx
// The proxy should insert the IP address of the client in the 'X-Forward-For' header
app.enable("trust proxy");

// Alternative method that specifies the IP address(es) of your trusted proxy
// app.set("trust proxy", "loopback");

//==============================================================

// Enable CORS to skip the same-origin policy
let corsOptions = {
    credentials: true,
    origin: ["http://localhost:3000", "http://rollplays.me"],
    preflightContinue: true
};

app.use(cors(corsOptions));

//==============================================================

// Set up logging
// app.use(morgan("combined"));

//==============================================================

// Parse incoming request bodies and expose it on the req.body property
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//==============================================================

// Configure session options
let sessionOptions = {
    store: new MongoDBStore({
        uri: dbConnectionString,
        collection: "sessions"
    }),
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: true,
    cookie: {}
};

if (app.get("env") === "production") {
    sessionOptions.cookie.secure = true; // serve secure cookies
}

app.use(session(sessionOptions));

//==============================================================

// Authenticate the user and enable persistent login sessions
passport.serializeUser(function(user, cb) {
    // console.log("serializeUser()");
    cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
    // console.log("deserializeUser()");
    User.findById(id, (err, user) => {
        if (err) {
            return cb(err);
        }
        return cb(null, user);
    });
});

app.use(passport.initialize());
app.use(passport.session());

//==============================================================

app.all("*", (req, res, next) => {
    console.log(req.method + " " + req.url);
    next();
});

app.get("/", (req, res) => {
    res.send("hello world");
});

//==============================================================

import auth from "./api/auth";
import game from "./api/game";
import rank from "./api/rank";

app.use("/auth", auth);
app.use("/game", game);
app.use("/rank", rank);

app.listen(9000, function() {
    console.log("Example app listening on port 9000!");
});
