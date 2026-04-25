const { body, validationResult } = require("express-validator");

const validateRegister = [
    body("email")
        .isEmail()
        .withMessage("Please enter a valid email address.")
        .normalizeEmail(),
    body("password")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long."),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.render("forms/register", {
                title: "Register",
                errors: errors.array(),
                oldInput: req.body,
            });
        }
        next();
    },
];

const validateLogIn = [
    body("email")
        .isEmail()
        .withMessage("Please enter a valid email address.")
        .normalizeEmail(),
    body("password").notEmpty().withMessage("Password cannot be empty."),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.render("forms/logIn", {
                title: "Log In",
                errors: errors.array(),
                oldInput: req.body,
            });
        }
        next();
    },
];

module.exports = { validateRegister, validateLogIn };
