const express = require("express");
const router = express.Router();
const { Instructor, Course } = require("../models");
const authorizeRole = require("../middleware/role");
const isAuthenticated = require("../middleware/auth");


router.get("/createinstructor", isAuthenticated, authorizeRole("admin"), (req, res) => {
  res.render("createInstructor");
});

router.post("/instructors", isAuthenticated, authorizeRole("admin"), async (req, res) => {
  const instructor = await Instructor.create({ name: req.body.name });
  res.send("Instructor Created Successfully");
});



router.get("/createcourse", isAuthenticated, authorizeRole("admin"), async (req, res) => {
  const instructors = await Instructor.findAll();
  res.render("createCourse", { instructors });
});

router.post("/courses", isAuthenticated, authorizeRole("admin"), async (req, res) => {
  const course = await Course.create({
    title: req.body.title,
    fee: req.body.fee,
    InstructorId: req.body.instructorId
  });
  res.send("Course Created Successfully");
});



router.get("/mycourses", isAuthenticated, authorizeRole("instructor"), async (req, res) => {
  const courses = await Course.findAll({
    where: { InstructorId: req.session.user.id }
  });

  res.render("instructorCourse", { courses });
});

module.exports = router;
