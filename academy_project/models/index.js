const sequelize = require("../db/connection");
const { DataTypes } = require("sequelize");

const User = require("./user")(sequelize, DataTypes);
const Instructor = require("./instructor")(sequelize, DataTypes);
const Student = require("./student")(sequelize, DataTypes);
const Profile = require("./profile")(sequelize, DataTypes);
const Course = require("./course")(sequelize, DataTypes);
const Enrollment = require("./enrollment")(sequelize, DataTypes);

Student.hasOne(Profile);
Profile.belongsTo(Student);

Instructor.hasMany(Course);
Course.belongsTo(Instructor);

Student.belongsToMany(Course, {
  through: Enrollment,
  foreignKey: "StudentId"
});

Course.belongsToMany(Student, {
  through: Enrollment,
  foreignKey: "CourseId"
});

module.exports = {
  sequelize,
  User,
  Instructor,
  Student,
  Profile,
  Course,
  Enrollment
};
