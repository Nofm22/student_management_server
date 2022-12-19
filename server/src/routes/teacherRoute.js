const express = require("express");
const {
    getTeacherController,
    deleteTeacherControlller,
    updateTeacherController,
} = require("../controllers/teacherController");

const teacherRouter = express.Router();

teacherRouter.get("/getTeachers", getTeacherController);
teacherRouter.get("/deleteTeacher", deleteTeacherControlller);
teacherRouter.post("/updateTeacher", updateTeacherController);

module.exports = {
    teacherRouter,
};
