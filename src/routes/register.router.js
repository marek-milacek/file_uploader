const { Router } = require("express");
const router = Router();
const {
    registerUser,
    renderRegisterForm,
} = require("../controllers/register.controller");
const { validateRegister } = require("../middlewares/formValidation");

router.get("/", renderRegisterForm);
router.post("/", validateRegister, registerUser);

module.exports = router;
