const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const User = require("./User");
const App  = require("./App");

const Review = sequelize.define("Review", {
  id: 
       { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  rating:
    { type: DataTypes.INTEGER, allowNull: false },
  review:
    { type: DataTypes.TEXT,    allowNull: false },
}, { timestamps: true });

Review.belongsTo(User, { foreignKey: "userId", as: "user" });
Review.belongsTo(App,  { foreignKey: "appId",  as: "app"  });
User.hasMany(Review,   { foreignKey: "userId" });
App.hasMany(Review,    { foreignKey: "appId"  });

module.exports = Review;
