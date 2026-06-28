const Notification = require('../models/Notification');

class NotificationService {
  async getUserNotifications(user) {
    const userId = user._id || user.id;
    const notifications = await Notification.find({ userId })
      .sort({ createdAt: -1 })
      .limit(50);
    return notifications;
  }

  async markAsRead(notificationId, user) {
    const userId = user._id || user.id;
    const notification = await Notification.findOne({ _id: notificationId, userId });
    if (!notification) {
      throw new Error('Notification not found');
    }
    notification.isRead = true;
    await notification.save();
    return notification;
  }
}

module.exports = new NotificationService();
