const fs = require("fs").promises;
const emitter = require("./Events");

async function router(req, res) {

  if (req.url === "/health") {
    res.end("Server is healthy");
  }

  else if (req.url === "/login") {
    emitter.emit("userLogin", "Anusiya");
    res.end("User login success");
  }

  else if (req.url === "/users") {
    const users = await fs.readFile("User.json", "utf8");
    emitter.emit("dataFetched");
    res.end(users);
  }

  else {
    res.writeHead(404);
    res.end("No proper routing found");
  }
}

module.exports = router;