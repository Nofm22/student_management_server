const express = require("express");
const {
    createCourseController,
    getCoursesController,
    getCoursesSummaryController,
    deleteCourseController,
    getCoursesByGradeController,
    updateCourseController,
} = require("../controllers/courseControllers");

const courseRoute = express.Router();

courseRoute.post("/createCourse", createCourseController);
courseRoute.delete("/deleteCourse", deleteCourseController);
courseRoute.get("/getCourses", getCoursesController);
courseRoute.get("/getCoursesByGrade", getCoursesByGradeController);
courseRoute.get("/getCoursesSummary", getCoursesSummaryController);
courseRoute.put("/updateCourse", updateCourseController);
module.exports = {
    courseRoute,
};
