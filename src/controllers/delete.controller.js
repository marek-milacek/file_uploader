const { db } = require("../db/pool");

async function deletedb(req, res) {
    try {
        await db.execute("DELETE FROM users");
        res.status(200).redirect("/");
    } catch (error) {
        console.error("Error deleting users:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = { deletedb };
