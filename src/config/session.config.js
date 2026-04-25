const session = require("express-session");
const pgSession = require("connect-pg-simple")(session);

const sessionConfig = session({
    store: new pgSession({
        conString: process.env.DATABASE_URL,
        createTableIfMissing: true,
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true,
    },
});

module.exports = sessionConfig;
