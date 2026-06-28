const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({
        message: `Forbidden: Access restricted to role(s): ${roles.join(', ')}`
      });
    }
    next();
  };
};

module.exports = { restrictTo };
