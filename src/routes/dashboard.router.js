const { Router } = require("express");
const router = Router();
const { ensureAuthenticated } = require("../middlewares/authentication");
const { renderDashboard } = require("../controllers/dashboard.controller");
const { uploadFile } = require("../controllers/upload.controller");
const upload = require("../config/multer.config");

router.get("/", ensureAuthenticated, renderDashboard);

module.exports = router;
