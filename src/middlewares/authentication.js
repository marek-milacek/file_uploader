function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }

    return res.redirect("/logIn");
}

module.exports = { ensureAuthenticated };
