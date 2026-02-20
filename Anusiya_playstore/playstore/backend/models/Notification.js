const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const User = require("./User");

const Notification = sequelize.define("Notification", {
  id:         
    { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  type:     
      { type: DataTypes.ENUM("download","review","login","register","admin","update"), allowNull: false },
  title:  
        { type: DataTypes.STRING, allowNull: false },
  message:  
      { type: DataTypes.STRING, allowNull: false },
  isRead:   
      { type: DataTypes.BOOLEAN, defaultValue: false },
  relatedAppId: 
  { type: DataTypes.INTEGER, allowNull: true },
},
 { timestamps: true });

Notification.belongsTo(User, { foreignKey: "recipientId", as: "recipient" });

module.exports = Notification;
