const interactionService = require('../services/interactionService');

const toggleLike = async (req, res) => {
  try {
    const result = await interactionService.toggleLike(req.params.id, req.user);
    return res.status(200).json({
      message: `Project ${result.action} successfully`,
      ...result
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const followStudent = async (req, res) => {
  try {
    const result = await interactionService.followStudent(req.params.studentId, req.user);
    return res.status(200).json({
      message: `Successfully ${result.status} student`,
      ...result
    });
  } catch (error) {
    const statusCode = error.message.includes('Forbidden') ? 403 : 400;
    return res.status(statusCode).json({ message: error.message });
  }
};

module.exports = {
  toggleLike,
  followStudent
};
