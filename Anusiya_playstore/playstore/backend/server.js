const express = require("express");
const cors    = require("cors");
const dotenv  = require("dotenv");
const { syncDB } = require("./config/db");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

syncDB();

app.use("/api/auth",   require("./routes/authRoutes"));
app.use("/api/apps",  require("./routes/appRoutes"));
app.use("/api/reviews",   require("./routes/reviewRoutes"));
app.use("/api/notifications", require("./routes/notificationRoutes"));
app.use("/api/users",  require("./routes/userRoutes"));

app.listen(process.env.PORT || 5000, () =>
  console.log("Server running on port " + (process.env.PORT || 5000))
);
