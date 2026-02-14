require("dotenv").config();

const express = require("express");
const session = require("express-session");
const path = require("path");

const { sequelize } = require("./models");

const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const studentRoutes = require("./routes/studentRoutes");

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use("/", authRoutes);
app.use("/", adminRoutes);
app.use("/", studentRoutes);

sequelize.sync({ force: true }).then(() => {
  app.listen(process.env.PORT, () => {
    console.log("Server running on port 3000");
  });
});
