const { db } = require("../db/pool");
const { files } = require("../db/schema");
const fs = require("node:fs/promises");
const path = require("node:path");
const { eq } = require("drizzle-orm");

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

async function downloadFile(req, res, next) {
    try {
        const fileId = Number(req.params.id);
        if (Number.isNaN(fileId)) {
            return res.status(400).send("Invalid file id.");
        }

        const [file] = await db
            .select()
            .from(files)
            .where(eq(files.id, fileId))
            .where(eq(files.userId, req.user.id));

        if (!file) {
            return res.status(404).send("File not found.");
        }

        const filePath = path.resolve(file.path);
        return res.download(filePath, file.name, (err) => {
            if (err) {
                next(err);
            }
        });
    } catch (error) {
        next(error);
    }
}

async function deleteFile(req, res, next) {
    try {
        const fileId = Number(req.params.id);
        if (Number.isNaN(fileId)) {
            return res.status(400).send("Invalid file id.");
        }

        const [file] = await db
            .select()
            .from(files)
            .where(eq(files.id, fileId))
            .where(eq(files.userId, req.user.id));

        if (!file) {
            return res.status(404).send("File not found.");
        }

        const filePath = path.resolve("uploads", path.basename(file.path));
        try {
            await fs.unlink(filePath);
        } catch (unlinkError) {
            if (unlinkError.code !== "ENOENT") {
                throw unlinkError;
            }
        }

        await db.delete(files).where(eq(files.id, fileId));
        res.redirect("/dashboard");
    } catch (error) {
        next(error);
    }
}

module.exports = { renderUploadForm, uploadFile, downloadFile, deleteFile };
