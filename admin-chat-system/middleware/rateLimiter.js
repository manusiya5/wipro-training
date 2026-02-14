const rateLimit = require("express-rate-limit");

const messageLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, 
  max: 5,
  message: "Too many messages. Please try later."
});

module.exports = messageLimiter;
