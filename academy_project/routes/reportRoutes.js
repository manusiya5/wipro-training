const express = require("express");
const router = express.Router();
const { Student, Course, Enrollment, sequelize } = require("../models");
const auth = require("../middleware/auth");
const role = require("../middleware/role");

router.get("/reports", auth, role("admin"), async (req, res) => {

  const totalStudents = await Student.count();
  const totalCourses = await Course.count();
  const totalEnrollments = await Enrollment.count();

  const revenue = await Course.sum("fee");

  res.render("reports", {
    totalStudents,
    totalCourses,
    totalEnrollments,
    revenue
  });
});

module.exports = router;
