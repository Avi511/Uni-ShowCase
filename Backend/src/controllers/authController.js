const authService = require('../services/authService');

const generateInvite = async (req, res) => {
  try {
    const { role, email } = req.body;
    const hostUrl = `${req.protocol}://${req.get('host')}`;
    const result = authService.generateInviteLink(role, email, hostUrl);
    return res.status(201).json({
      message: 'Invitation link generated successfully',
      ...result
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
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
    const { inviteToken, mockName, mockEmail, mockGoogleId } = req.query;

    const userData = {
      googleId: mockGoogleId || req.user?.googleId || `google-id-${Date.now()}`,
      name: mockName || req.user?.name || 'Test User',
      email: mockEmail || req.user?.email || `user${Date.now()}@university.edu`,
      profilePicture: req.user?.profilePicture || '',
      inviteToken
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

module.exports = {
  generateInvite,
  initiateGoogleAuth,
  handleGoogleCallback
};
