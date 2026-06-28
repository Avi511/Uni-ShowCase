const eventEmitter = require('./emitters');
const Notification = require('../models/Notification');
const Follower = require('../models/Follower');

const initEventListeners = () => {
  eventEmitter.on('ProjectCreated', async ({ project, user }) => {
    try {
      const followers = await Follower.find({ studentId: user._id || user.id });
      for (const follow of followers) {
        await Notification.create({
          userId: follow.recruiterId,
          message: `${user.name} published a new project: "${project.title}"`
        });
      }
    } catch (error) {
      console.error('Error in ProjectCreated listener:', error);
    }
  });

  eventEmitter.on('ProjectLiked', async ({ project, likerUser, action }) => {
    try {
      if (action === 'liked') {
        const ownerId = project.studentId._id || project.studentId;
        const likerId = likerUser._id || likerUser.id;

        if (ownerId.toString() !== likerId.toString()) {
          await Notification.create({
            userId: ownerId,
            message: `${likerUser.name} liked your project: "${project.title}"`
          });
        }
      }
    } catch (error) {
      console.error('Error in ProjectLiked listener:', error);
    }
  });
};

module.exports = initEventListeners;
