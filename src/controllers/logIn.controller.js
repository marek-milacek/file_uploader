const passport = require("passport");

function renderLogInForm(req, res) {
    res.render("forms/logIn", {
        title: "Sign In",
        errors: [],
        oldInput: {},
    });
}

function logInUser(req, res, next) {
    passport.authenticate("local", (err, user, info) => {
        if (err) {
            return next(err);
        }

        if (!user) {
            return res.status(401).render("forms/logIn", {
                title: "Sign In",
                errors: [
                    {
                        msg:
                            info && info.message
                                ? info.message
                                : "Invalid email or password.",
                    },
                ],
                oldInput: { email: req.body.email },
            });
        }

        req.logIn(user, (loginErr) => {
            if (loginErr) {
                return next(loginErr);
            }
            return res.redirect("/dashboard");
        });
    })(req, res, next);
}

module.exports = { renderLogInForm, logInUser };
