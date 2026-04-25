const { Router } = require("express");
const router = Router();
const { ensureAuthenticated } = require("../middlewares/authentication");
const upload = require("../config/multer.config");
const {
    renderUploadForm,
    uploadFile,
    downloadFile,
    deleteFile,
} = require("../controllers/upload.controller");

router.get("/", ensureAuthenticated, renderUploadForm);
router.get("/download/:id", ensureAuthenticated, downloadFile);
router.get("/delete/:id", ensureAuthenticated, deleteFile);

router.post("/", ensureAuthenticated, upload.single("fileInput"), uploadFile);

module.exports = router;
