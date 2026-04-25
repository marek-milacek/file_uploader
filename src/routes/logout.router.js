const { Router } = require("express");
const router = Router();
const { ensureAuthenticated } = require("../middlewares/authentication");
const { logOutUser } = require("../controllers/logout.controller");

router.get("/", ensureAuthenticated, logOutUser);

module.exports = router;
