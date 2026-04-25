const { db } = require("../db/pool");
const { files } = require("../db/schema");
const { eq } = require("drizzle-orm");

async function renderDashboard(req, res, next) {
    try {
        const userFiles = await db
            .select()
            .from(files)
            .where(eq(files.userId, req.user.id));

        res.render("dashboard", {
            title: "Dashboard",
            files: userFiles,
        });
    } catch (error) {
        next(error);
    }
}

module.exports = { renderDashboard };
