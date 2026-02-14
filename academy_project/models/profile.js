module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Profile", {
    address: DataTypes.STRING,
    phone: DataTypes.STRING
  });
};
