const { Router } = require("express");
const router = Router();
const { deletedb } = require("../controllers/delete.controller");

router.get("/", deletedb);

module.exports = router;
