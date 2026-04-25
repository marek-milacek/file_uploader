require("dotenv").config();
require("./config/passport.config");
const express = require("express");
const app = express();
const path = require("node:path");
const passport = require("passport");
const sessionConfig = require("./config/session.config");

const indexRouter = require("./routes/index.router");
const dashboardRouter = require("./routes/dashboard.router");
const logInRouter = require("./routes/logIn.router");
const registerRouter = require("./routes/register.router");
const logoutRouter = require("./routes/logout.router");
const uploadRouter = require("./routes/upload.router");
const errorHandler = require("./middlewares/errorHandler");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(sessionConfig);
app.use(passport.initialize());
app.use(passport.session());

app.use("/", indexRouter);
app.use("/dashboard", dashboardRouter);
app.use("/logIn", logInRouter);
app.use("/register", registerRouter);
app.use("/logout", logoutRouter);
app.use("/upload", uploadRouter);

app.use(errorHandler);

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
});
