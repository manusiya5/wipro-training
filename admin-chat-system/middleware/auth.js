module.exports = function auth(req, res, next) {
  if (req.headers.auth === "admin") {
    next();
  } else {
    res.status(401).send("Not authenticated");
  }
};
