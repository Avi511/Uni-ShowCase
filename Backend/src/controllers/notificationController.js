const notificationService = require('../services/notificationService');

const getNotifications = async (req, res) => {
  try {
    const notifications = await notificationService.getUserNotifications(req.user);
    return res.status(200).json({
      count: notifications.length,
      notifications
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const markAsRead = async (req, res) => {
  try {
    const notification = await notificationService.markAsRead(req.params.id, req.user);
    return res.status(200).json({ message: 'Marked as read', notification });
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

module.exports = {
  getNotifications,
  markAsRead
};
