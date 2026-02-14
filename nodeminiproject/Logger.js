const fs = require("fs");

function logRequest(url) {
  fs.appendFile(
    "logs.txt",
    `Request: ${url} | ${new Date().toLocaleString()}\n`,
    () => {}
  );
}

module.exports = logRequest;