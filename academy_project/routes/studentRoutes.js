const express = require("express");
const router = express.Router();
const { User } = require("../models");

function isAuthenticated(req, res, next) {
    if (!req.session.user) {
        return res.redirect("/login");
    }
    next();
}

router.get("/students", isAuthenticated, async (req, res) => {
    try {
        const students = await User.findAll({
            where: { role: "student" }
        });

        res.render("students", { students });
    } catch (error) {
        console.log(error);
        res.send("Error fetching students");
    }
});

module.exports = router;
