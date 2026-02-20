const router = require("express").Router();
const svc    = require("../services/notificationService");
const auth   = require("../middleware/authMiddleware");

router.get("/unread", auth, async (req, res) => {
  try {
    const notifications = await svc.getUnread(req.user.id);
    res.json({
      count: notifications.length,
      notifications: notifications.map(n => ({ ...n.toJSON(), _id: n.id })),
    });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

router.get("/", auth, async (req, res) => {
  try {
    const page  = parseInt(req.query.page)  || 1;
    const limit = parseInt(req.query.limit) || 20;
    const result = await svc.getAll(req.user.id, page, limit);
    res.json({
      ...result,
      notifications: result.notifications.map(n => ({ ...n.toJSON(), _id: n.id })),
    });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

router.put("/read-all", auth, async (req, res) => {
  try {
    await svc.markAllAsRead(req.user.id);
    res.json({ message: "All marked as read" });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

router.put("/:id/read", auth, async (req, res) => {
  try {
    const n = await svc.markAsRead(req.params.id);
    res.json({ message: "Marked as read", notification: { ...n.toJSON(), _id: n.id } });
  } catch (e) { res.status(400).json({ error: e.message }); }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    await svc.delete(req.params.id);
    res.json({ message: "Notification deleted" });
  } catch (e) { res.status(400).json({ error: e.message }); }
});

module.exports = router;
