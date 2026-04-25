const { db } = require("../db/pool");
const { files } = require("../db/schema");

function renderUploadForm(req, res) {
    res.render("forms/upload", { title: "Upload File" });
}

async function uploadFile(req, res) {
    try {
        if (!req.file) {
            return res.status(400).send("No file uploaded.");
        }

        await db.insert(files).values({
            name: req.file.originalname,
            path: req.file.path,
            size: req.file.size,
            userId: req.user.id,
        });
        console.log("File metadata saved to database.");
        res.redirect("/dashboard");
    } catch (err) {
        console.error("Error saving file metadata:", err);
        res.status(500).send("Internal server error.");
    }
}

module.exports = { renderUploadForm, uploadFile };
