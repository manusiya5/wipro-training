const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME || "playstore",
  process.env.DB_USER || "root",
  process.env.DB_PASS || "root",
  {
    host:    process.env.DB_HOST    || "localhost",
    dialect: process.env.DB_DIALECT || "mysql",
    logging: false,
  }
);

const syncDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("MySQL Connected");
    await sequelize.sync({ alter: true });
    console.log("Tables synced");
  } catch (err) {
    console.error("DB Error:", err.message);
    process.exit(1);
  }
};

module.exports = { sequelize, syncDB };
