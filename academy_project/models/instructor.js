module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Instructor", {
    name: {
      type: DataTypes.STRING,
    }
  });
};
