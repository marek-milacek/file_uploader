const { Router } = require("express");
const router = Router();
const { ensureAuthenticated } = require("../middlewares/authentication");
const upload = require("../config/multer.config");
const {
    renderUploadForm,
    uploadFile,
} = require("../controllers/upload.controller");

router.get("/", ensureAuthenticated, renderUploadForm);
router.post("/", ensureAuthenticated, upload.single("fileInput"), uploadFile);

module.exports = router;
