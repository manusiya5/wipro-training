const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const multer = require("multer");
const fs = require("fs");

const auth = require("./middleware/auth");
const rateLimiter = require("./middleware/rateLimiter");

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.json());

app.use(express.static("public"));

app.use("/uploads", express.static("uploads"));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      "image/png",
      "image/jpeg",
      "application/pdf"
    ];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  }
});

app.post("/upload", auth, upload.single("file"), (req, res) => {
  res.send("File uploaded successfully");
});

app.get("/files", (req, res) => {
  fs.readdir("uploads", (err, files) => {
    if (err) {
      return res.status(500).send("Unable to read files");
    }
    res.json(files);
  });
});

app.post("/send-message", auth, rateLimiter, (req, res) => {
  io.emit("chatMessage", req.body.message);
  res.send("Message sent");
});

io.on("connection", socket => {
  console.log("User connected:", socket.id);
});

server.listen(5001, () => {
  console.log("Server running on port 5001");
});
