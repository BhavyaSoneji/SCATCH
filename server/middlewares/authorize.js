const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    if (allowedRoles.includes(req.userType)) {
      next();
    } else {
      return res.status(403).json({
        message: "Access denied",
      });
    }
  };
};

module.exports = authorize;
