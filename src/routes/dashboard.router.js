const { Router } = require("express");
const router = Router();
const { ensureAuthenticated } = require("../middlewares/authentication");
const {
    renderDashboard,
} = require("../controllers/dashboard.controller");

router.get("/", ensureAuthenticated, renderDashboard);

module.exports = router;
