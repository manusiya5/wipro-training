const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt    = require("jsonwebtoken");
const User   = require("../models/User");
const notificationService = require("../services/notificationService");

// REGISTER
router.post("/register", async (req, res) => {
  try {
    const exists = await User.findOne({ where: { email: req.body.email } });
    if (exists) return res.status(400).json("Email already registered");

    const hash = await bcrypt.hash(req.body.password, 10);

    const user = await User.create({ 
      name: req.body.name, 
      email: req.body.email, 
      password: hash,
      role: req.body.role || "user"  
    });

    const admins = await User.findAll({ where: { role: "admin" } });
    for (const admin of admins) {
      await notificationService.notifyRegister(admin.id, user.name);
    }

    res.json({ id: user.id, name: user.name, email: user.email, role: user.role });
  } catch (err) { res.status(500).json(err.message); }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });
    if (!user) return res.status(400).json("User not found");

    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) return res.status(400).json("Invalid password");

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET);

    if (user.role !== "admin") {
      const admins = await User.findAll({ where: { role: "admin" } });
      for (const admin of admins) {
        await notificationService.notifyLogin(admin.id, user.name);
      }
    }

    res.json({ token, user: { id: user.id, _id: user.id, name: user.name, email: user.email, role: user.role } });
  } catch (err) { res.status(500).json(err.message); }
});

module.exports = router;