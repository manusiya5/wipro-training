const EventEmitter = require("events");
const emitter = new EventEmitter();

emitter.on("userLogin", (user) => {
  console.log("Welcome email sent to", user);
});

emitter.on("dataFetched", () => {
  console.log("User data fetched successfully");
});

module.exports = emitter;