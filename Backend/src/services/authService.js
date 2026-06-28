const User = require('../models/User');
const { generateInviteToken, verifyInviteToken, generateUserToken } = require('../utils/inviteGenerator');

class AuthService {
  generateInviteLink(role = 'Student', email = '', hostUrl = 'http://localhost:5000') {
    const validRoles = ['Student', 'Recruiter', 'Admin'];
    if (!validRoles.includes(role)) {
      throw new Error(`Invalid role. Must be one of: ${validRoles.join(', ')}`);
    }
    const token = generateInviteToken(role, email);
    const inviteLink = `${hostUrl}/api/auth/google?inviteToken=${token}`;
    return { token, inviteLink, role };
  }

  validateInvite(token) {
    if (!token) throw new Error('Invitation token is required');
    const decoded = verifyInviteToken(token);
    if (!decoded) throw new Error('Invalid or expired invitation token');
    return decoded;
  }
  async processUserRegistration({ googleId, name, email, profilePicture, inviteToken }) {
    const decodedInvite = this.validateInvite(inviteToken);

    let user = await User.findOne({ email });
    if (user) {
      user.googleId = googleId || user.googleId;
      user.isVerified = true;
      await user.save();
    } else {
      user = await User.create({
        googleId,
        name,
        email,
        profilePicture,
        role: decodedInvite.role || 'Student',
        isVerified: true
      });
    }
    return { user, authToken: generateUserToken(user) };
  }
}

module.exports = new AuthService();
