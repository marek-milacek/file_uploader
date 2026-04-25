const { db } = require("../db/pool");
const { users } = require("../db/schema");
const bcrypt = require("bcryptjs");

function renderRegisterForm(req, res) {
    res.render("forms/register", { title: "Register" });
}

async function registerUser(req, res) {
    const { email, password } = req.body;

    try {
        await db.insert(users).values({
            email: email,
            password: await bcrypt.hash(password, 10),
        });
        res.status(201).redirect("/logIn");
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = { renderRegisterForm, registerUser };
