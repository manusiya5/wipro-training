const router = require("express").Router();
const Review = require("../models/Review");
const App    = require("../models/App");
const User   = require("../models/User");
const auth   = require("../middleware/authMiddleware");
const notificationService = require("../services/notificationService");

// ADD REVIEW
router.post("/:id", auth, async (req, res) => {
  try {
    const app = await App.findByPk(req.params.id);
    if (!app) return res.status(404).json("App not found");

    await Review.create({
      appId:  req.params.id,
      userId: req.user.id,
      rating: req.body.rating,
      review: req.body.review,
    });

    const reviews = await Review.findAll({ where: { appId: req.params.id } });
    const avg = reviews.reduce((s, r) => s + r.rating, 0) / reviews.length;
    await App.update({ rating: avg }, { where: { id: req.params.id } });

    await notificationService.notifyUserReviewAdded(req.user.id, app.name, req.body.rating);

    const admins = await User.findAll({ where: { role: "admin" } });
    for (const admin of admins) {
      await notificationService.notifyReview(admin.id, req.user.name || "A user", app.name, req.body.rating);
    }

    res.json("Review added successfully");
  } catch (err) { res.status(500).json(err.message); }
});

// EDIT REVIEW
router.put("/:appId/:reviewId", auth, async (req, res) => {
  try {
    const review = await Review.findByPk(req.params.reviewId);
    if (!review) return res.status(404).json("Review not found");
    if (review.userId !== req.user.id) return res.status(403).json("Not your review");

    const app = await App.findByPk(req.params.appId);

    await review.update({ rating: req.body.rating, review: req.body.review });

    await notificationService.notifyUserReviewEdited(req.user.id, app?.name || "the app");

    res.json("Review updated");
  } catch (err) { res.status(500).json(err.message); }
});

// DELETE REVIEW
router.delete("/:appId/:reviewId", auth, async (req, res) => {
  try {
    const review = await Review.findByPk(req.params.reviewId);
    if (!review) return res.status(404).json("Review not found");
    if (review.userId !== req.user.id) return res.status(403).json("Not your review");

    const app = await App.findByPk(req.params.appId);

    await review.destroy();

    await notificationService.notifyUserReviewDeleted(req.user.id, app?.name || "the app");

    res.json("Review deleted");
  } catch (err) { res.status(500).json(err.message); }
});

module.exports = router;