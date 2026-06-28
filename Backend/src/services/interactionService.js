const Like = require('../models/Like');
const Follower = require('../models/Follower');
const Project = require('../models/Project');
const User = require('../models/User');
const eventEmitter = require('../events/emitters');

class InteractionService {
  async toggleLike(projectId, user) {
    const project = await Project.findById(projectId);
    if (!project) throw new Error('Project not found');

    const userId = user._id || user.id;
    const existingLike = await Like.findOne({ projectId, userId });

    let action = '';
    if (existingLike) {
      await existingLike.deleteOne();
      action = 'unliked';
    } else {
      await Like.create({ projectId, userId });
      action = 'liked';
    }

    const totalLikes = await Like.countDocuments({ projectId });
    eventEmitter.emit('ProjectLiked', { project, likerUser: user, action });
    return { action, totalLikes, projectId };
  }

  async followStudent(studentId, recruiterUser) {
    if (recruiterUser.role !== 'Recruiter') throw new Error('Forbidden: Only recruiters can follow students');

    const student = await User.findById(studentId);
    if (!student) throw new Error('Student not found');
    if (student.role !== 'Student') throw new Error('Target user is not a student');

    const recruiterId = recruiterUser._id || recruiterUser.id;
    const existingFollow = await Follower.findOne({ recruiterId, studentId });
    if (existingFollow) {
      await existingFollow.deleteOne();
      return { status: 'unfollowed', recruiterId, studentId };
    } else {
      await Follower.create({ recruiterId, studentId });
      return { status: 'followed', recruiterId, studentId };
    }
  }
}

module.exports = new InteractionService();
