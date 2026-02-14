const express = require("express");
const router = express.Router();
const { Instructor, Course } = require("../models");
const isAuthenticated = require("../middleware/auth");
const authorizeRole = require("../middleware/role");

router.get("/create-instructor", isAuthenticated, authorizeRole("admin"), (req, res) => {
  res.render("createInstructor");
});

router.post("/instructors", isAuthenticated, authorizeRole("admin"), async (req, res) => {
  await Instructor.create({ name: req.body.name });
  res.send("Instructor Created");
});

router.get("/create-course", isAuthenticated, authorizeRole("admin"), async (req, res) => {
  const instructors = await Instructor.findAll();
  res.render("createCourse", { instructors });
});

router.post("/courses", isAuthenticated, authorizeRole("admin"), async (req, res) => {
  await Course.create({
    title: req.body.title,
    fee: req.body.fee,
    InstructorId: req.body.instructorId
  });
  res.send("Course Created");
});

module.exports = router;
