const router = require("express").Router();
const User   = require("../models/User");
const auth   = require("../middleware/authMiddleware");
const admin  = require("../middleware/adminMiddleware");

router.get("/", auth, admin, async (req, res) => {
  try {
    const users = await User.findAll({ attributes: { exclude: ["password"] } });
    res.json(users.map(u => ({ ...u.toJSON(), _id: u.id })));
  } catch (err) { res.status(500).json(err.message); }
});

router.get("/me", auth, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, { attributes: { exclude: ["password"] } });
    res.json({ ...user.toJSON(), _id: user.id });
  } catch (err) { res.status(500).json(err.message); }
});

router.delete("/:id", auth, admin, async (req, res) => {
  try {
    await User.destroy({ where: { id: req.params.id } });
    res.json("User deleted");
  } catch (err) { res.status(500).json(err.message); }
});

module.exports = router;
