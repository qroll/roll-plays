import "~/src/config";

import express from "express";

import Logger from "~/src/utils/Logger";
import User from "~/src/models/user";
import { DB, SESSION, inEnv } from "~/src/config";
import { errorBuilder } from "~/src/utils/ResponseBuilder";

//==============================================================

let app = express();

//==============================================================

// Uncomment this section to enable 'trust proxy':
//   The app sits behind a trusted proxy such as nginx
//   The proxy should insert the IP address of the client in the 'X-Forwarded-*' header

if (inEnv("production")) {
    app.enable("trust proxy", 1);
}

//==============================================================

// Uncomment this section to enable CORS:
//   Whitelist cross-origin domains that are allowed to access the app

import cors from "cors";

let corsOptions = {
    credentials: true,
    origin: ["https://rollplays.me"],
    preflightContinue: true
};

// Enable CORS for any domain in development
if (inEnv("development")) {
    corsOptions.origin = true;
}

app.use(cors(corsOptions));

//==============================================================

// Parse incoming request bodies and expose it on req.body
import bodyParser from "body-parser";

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//==============================================================

// Uncomment this section to enable session cookies:
//   Store or access session data on req.session

import session from "express-session";
import connectMongoDB from "connect-mongodb-session";

const MongoDBStore = connectMongoDB(session);

let sessionOptions = {
    cookie: {},
    resave: true,
    saveUninitialized: true,
    secret: SESSION.SIGNING_KEY,
    store: new MongoDBStore({
        uri: DB.URI,
        collection: "sessions"
    })
};

// Serve secure cookies (cookies are sent only over HTTPS)
// Proxy must be trusted so that client connection can be detected as HTTPS
if (inEnv("production")) {
    sessionOptions.cookie.secure = true;
}

app.use(session(sessionOptions));

//==============================================================

// Uncomment this section to enable persistent login sessions:
//   On subsequent requests, user info is accessed on req.user

import passport from "passport";

// Used to identify the authenticated user
passport.serializeUser(function(user, cb) {
    cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
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

import router from "~/src/api/routes";

app.use("/", router);

app.use(function(err, req, res, next) {
    let errorInfo = errorBuilder({
        error: err
    });

    Logger.error({ error: errorInfo.error, message: errorInfo.message });

    res.status(errorInfo.status).json({
        code: errorInfo.code,
        message: errorInfo.message,
        error: errorInfo.error
    });
});

app.listen(9000, function() {
    Logger.info("Server listening on port 9000!");
});
