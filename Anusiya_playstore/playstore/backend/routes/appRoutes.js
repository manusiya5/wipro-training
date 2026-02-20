const router  = require("express").Router();
const { Op }  = require("sequelize");
const App     = require("../models/App");
const auth    = require("../middleware/authMiddleware");
const admin   = require("../middleware/adminMiddleware");
const notificationService = require("../services/notificationService");

// SEARCH 
router.get("/search", async (req, res) => {
  try {
    const apps = await App.findAll({ where: { name: { [Op.like]: `%${req.query.keyword}%` } } });

    res.json(apps.map(a => ({ ...a.toJSON(), _id: a.id })));
  } catch (err) { res.status(500).json(err.message); }
});

// FILTER 
router.get("/filter", async (req, res) => {
  try {
    const where = {};
    const order = [];
    if (req.query.rating) where.rating = { [Op.gte]: Number(req.query.rating) };
    if (req.query.sort === "asc")  order.push(["name", "ASC"]);
    if (req.query.sort === "desc") order.push(["name", "DESC"]);
    const apps = await App.findAll({ where, order });
    res.json(apps.map(a => ({ ...a.toJSON(), _id: a.id })));
  } catch (err) { res.status(500).json(err.message); }
});

// CATEGORY 
router.get("/category/:categoryName", async (req, res) => {
  try {
    const apps = await App.findAll({ where: { genre: { [Op.like]: `%${req.params.categoryName}%` } } });
    res.json(apps.map(a => ({ ...a.toJSON(), _id: a.id })));
  } catch (err) { res.status(500).json(err.message); }
});

// GET ALL
router.get("/", async (req, res) => {
  try {
    const apps = await App.findAll();
    res.json(apps.map(a => ({ ...a.toJSON(), _id: a.id })));
  } catch (err) { res.status(500).json(err.message); }
});

// GET SINGLE
router.get("/:id", async (req, res) => {
  try {
    const Review = require("../models/Review");
    const User   = require("../models/User");
    const app = await App.findByPk(req.params.id);
    if (!app) return res.status(404).json("App not found");
    const reviews = await Review.findAll({
      where: { appId: req.params.id },
      include: [{ model: User, as: "user", attributes: ["id","name"] }],
      order: [["createdAt","DESC"]],
    });

    const shaped = reviews.map(r => ({
      ...r.toJSON(),
      _id: r.id,
      user: r.user ? { ...r.user.toJSON(), _id: r.user.id } : null,
    }));
    res.json({ ...app.toJSON(), _id: app.id, reviews: shaped });
  } catch (err) { res.status(500).json("App not found"); }
});

// ADD
router.post("/", auth, admin, async (req, res) => {
  try {
    const app = await App.create(req.body);
    res.json({ ...app.toJSON(), _id: app.id });
  } catch (err) { res.status(500).json(err.message); }
});

// EDIT 
router.put("/:id", auth, admin, async (req, res) => {
  try {
    await App.update(req.body, { where: { id: req.params.id } });
    const app = await App.findByPk(req.params.id);
    res.json({ ...app.toJSON(), _id: app.id });
  } catch (err) { res.status(500).json(err.message); }
});

// DELETE 
router.delete("/:id", auth, admin, async (req, res) => {
  try {
    await App.destroy({ where: { id: req.params.id } });
    res.json("Deleted");
  } catch (err) { res.status(500).json(err.message); }
});


router.post("/:id/install", auth, async (req, res) => {
  try {
    const App  = require("../models/App");
    const app  = await App.findByPk(req.params.id);
    if (!app) return res.status(404).json("App not found");

    await notificationService.notifyUserInstall(req.user.id, app.name);

    const User   = require("../models/User");
    const admins = await User.findAll({ where: { role: "admin" } });
    for (const admin of admins) {
      await notificationService.notifyDownload(admin.id, req.user.name || "A user", app.name);
    }

    res.json({ message: "App installed successfully!" });
  } catch (err) { res.status(500).json(err.message); }
});

module.exports = router;
