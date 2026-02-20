const Notification = require("../models/Notification");

class NotificationService {
  async create(data) {
    try { return await Notification.create(data); }
    catch (e) { console.error("Notification error:", e); return null; }
  }

  // existing admin notifications
  async notifyDownload(adminId, userName, appName) {
    return this.create({ recipientId: adminId, type: "download", title: "New Download! 📥", message: `${userName} downloaded ${appName}` });
  }
  async notifyReview(adminId, userName, appName, rating) {
    return this.create({ recipientId: adminId, type: "review", title: "New Review ⭐", message: `${userName} rated ${appName} ${rating} stars` });
  }
  async notifyRegister(adminId, userName) {
    return this.create({ recipientId: adminId, type: "register", title: "New User! 🎉", message: `${userName} just registered` });
  }
  async notifyLogin(adminId, userName) {
    return this.create({ recipientId: adminId, type: "login", title: "User Login 👋", message: `${userName} logged in` });
  }

  // user notifications
  async notifyUserInstall(userId, appName) {
    return this.create({ recipientId: userId, type: "download", title: "App Installed! 📥", message: `You successfully installed ${appName}` });
  }
  async notifyUserReviewAdded(userId, appName, rating) {
    return this.create({ recipientId: userId, type: "review", title: "Review Posted ⭐", message: `Your ${rating}★ review on ${appName} was added successfully` });
  }
  async notifyUserReviewEdited(userId, appName) {
    return this.create({ recipientId: userId, type: "update", title: "Review Updated ✏️", message: `Your review on ${appName} was updated successfully` });
  }
  async notifyUserReviewDeleted(userId, appName) {
    return this.create({ recipientId: userId, type: "admin", title: "Review Deleted 🗑️", message: `Your review on ${appName} was deleted` });
  }

  // methods
  async getUnread(userId) {
    return Notification.findAll({
      where: { recipientId: userId, isRead: false },
      order: [["createdAt", "DESC"]], limit: 50,
    });
  }
  async getAll(userId, page = 1, limit = 20) {
    const offset = (page - 1) * limit;
    const { count, rows } = await Notification.findAndCountAll({
      where: { recipientId: userId },
      order: [["createdAt", "DESC"]], offset, limit,
    });
    return { notifications: rows, total: count, page, totalPages: Math.ceil(count / limit) };
  }
  async markAsRead(id) {
    await Notification.update({ isRead: true }, { where: { id } });
    return Notification.findByPk(id);
  }
  async markAllAsRead(userId) {
    return Notification.update({ isRead: true }, { where: { recipientId: userId, isRead: false } });
  }
  async delete(id) {
    return Notification.destroy({ where: { id } });
  }
}

module.exports = new NotificationService();