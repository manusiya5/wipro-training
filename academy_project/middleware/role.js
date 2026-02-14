function authorizeRole(role) {
  return (req, res, next) => {
    if (req.session.user.role === role) {
      next();
    } else {
      res.send("Access Denied");
    }
  };
}

module.exports = authorizeRole;
