const express = require("express");
const router = express.Router();
const { User } = require("../models");

router.get("/", (req, res) => {
  res.render("login");
});

router.post("/login", async (req, res) => {
  const user = await User.findOne({
    where: {
      username: req.body.username,
      password: req.body.password
    }
  });

  if (!user) {
    return res.send("Invalid Credentials");
  }

  req.session.user = user;
  res.redirect("/dashboard");
});

router.get("/dashboard", (req, res) => {
  if (!req.session.user) return res.redirect("/");
  res.render("dashboard", { user: req.session.user });
});

router.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

module.exports = router;
