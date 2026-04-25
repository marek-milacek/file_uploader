const { Router } = require("express");
const router = Router();
const {
    renderLogInForm,
    logInUser,
} = require("../controllers/logIn.controller");
const { validateLogIn } = require("../middlewares/formValidation");

router.get("/", renderLogInForm);
router.post("/", validateLogIn, logInUser);

module.exports = router;
