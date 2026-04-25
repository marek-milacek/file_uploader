require("dotenv").config();
const express = require("express");
const path = require("node:path");
const passport = require("passport");
const sessionConfig = require("./config/session.config");
require("./config/passport.config");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(sessionConfig);
app.use(passport.initialize());
app.use(passport.session());

const indexRouter = require("./routes/index.router");
const dashboardRouter = require("./routes/dashboard.router");
const logInRouter = require("./routes/logIn.router");
const registerRouter = require("./routes/register.router");
const deleteRouter = require("./routes/delete.router");
const uploadRouter = require("./routes/upload.router");
const errorHandler = require("./middlewares/errorHandler");

app.use("/", indexRouter);
app.use("/dashboard", dashboardRouter);
app.use("/logIn", logInRouter);
app.use("/register", registerRouter);
app.use("/delete", deleteRouter);
app.use("/upload", uploadRouter);

app.use(errorHandler);

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
});
