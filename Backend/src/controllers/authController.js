const authService = require('../services/authService');

const generateInvite = async (req, res) => {
  try {
    const { role, email } = req.body;
    const origin = req.get('referer') || req.get('origin') || 'http://localhost:5173';
    const frontendUrl = origin.endsWith('/') ? origin.slice(0, -1) : origin;

    const result = await authService.generateInviteLink(role, email, frontendUrl);
    return res.status(201).json({
      message: 'Invitation generated and email sent successfully',
      ...result
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const getInvitations = async (req, res) => {
  try {
    const Invitation = require('../models/Invitation');
    const invitations = await Invitation.find().sort({ createdAt: -1 });
    return res.status(200).json({
      count: invitations.length,
      invitations
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const initiateGoogleAuth = async (req, res) => {
  try {
    const { inviteToken } = req.query;
    if (!inviteToken) {
      return res.status(400).json({ message: 'Missing required inviteToken query parameter' });
    }
    authService.validateInvite(inviteToken);
    return res.status(200).json({
      message: 'Invite token verified. Ready for OAuth redirect.',
      inviteToken,
      oauthUrl: `/api/auth/google/callback?inviteToken=${inviteToken}`
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const handleGoogleCallback = async (req, res) => {
  try {
    const { inviteToken, mockName, mockEmail, mockGoogleId, mockRole } = req.query;

    const userData = {
      googleId: mockGoogleId || req.user?.googleId || `google-id-${Date.now()}`,
      name: mockName || req.user?.name || 'Test User',
      email: mockEmail || req.user?.email || `user${Date.now()}@university.edu`,
      profilePicture: req.user?.profilePicture || '',
      inviteToken,
      mockRole
    };

    const { user, authToken } = await authService.processUserRegistration(userData);

    return res.status(200).json({
      message: 'Authentication successful',
      token: authToken,
      user
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const generateBulkInvites = async (req, res) => {
  try {
    const { invitations } = req.body;
    const origin = req.get('referer') || req.get('origin') || 'http://localhost:5173';
    const frontendUrl = origin.endsWith('/') ? origin.slice(0, -1) : origin;

    const result = await authService.generateBulkInvites(invitations, frontendUrl);
    return res.status(201).json({
      message: 'Bulk invitations processed',
      ...result
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports = {
  generateInvite,
  generateBulkInvites,
  getInvitations,
  initiateGoogleAuth,
  handleGoogleCallback
};
