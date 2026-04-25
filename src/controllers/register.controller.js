const { db } = require("../db/pool");
const { users } = require("../db/schema");
const bcrypt = require("bcryptjs");
const { eq } = require("drizzle-orm");

function renderRegisterForm(req, res) {
    res.render("forms/register", { title: "Register" });
}

async function registerUser(req, res) {
    const { email, password } = req.body;

    try {
        const [existingUser] = await db
            .select()
            .from(users)
            .where(eq(users.email, email));

        if (existingUser) {
            return res.render("forms/register", {
                title: "Register",
                errors: [{ msg: "This email is already registered." }],
                oldInput: req.body,
            });
        }

        await db.insert(users).values({
            email: email,
            password: await bcrypt.hash(password, 10),
        });
        res.status(201).redirect("/logIn");
    } catch (error) {
        console.error("Error registering user:", error);
        return res.render("forms/register", {
            title: "Register",
            errors: [
                { msg: "Unable to register at this time. Please try again." },
            ],
            oldInput: req.body,
        });
    }
}

module.exports = { renderRegisterForm, registerUser };
