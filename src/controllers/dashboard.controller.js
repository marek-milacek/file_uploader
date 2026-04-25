function renderDashboard(req, res) {
    res.render("dashboard", { title: "Dashboard" });
}

module.exports = { renderDashboard };
