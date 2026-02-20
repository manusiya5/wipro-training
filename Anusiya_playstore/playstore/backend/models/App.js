const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const App = sequelize.define("App", {
  id:  { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING },
  developer: { type: DataTypes.STRING },
  genre: { type: DataTypes.STRING },
  rating:   { type: DataTypes.FLOAT,   defaultValue: 0 },
  downloads:  { type: DataTypes.STRING,  defaultValue: "0" },
  version:   { type: DataTypes.STRING },
  description: { type: DataTypes.TEXT },
  image: { type: DataTypes.STRING },
}, { timestamps: true });

module.exports = App;
