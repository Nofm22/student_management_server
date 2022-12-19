const express = require("express");
const {
    createStudentController,
    deteteStudentController,
    getStudentController,
    updateStudentController,
    getListClassStudentsController,
    getStudentSearchController,
} = require("../controllers/studentControllers");
const { getListClassStudentsService } = require("../services/studentServices");

const studentRouter = express.Router();

studentRouter.post("/createStudent", createStudentController);
studentRouter.delete("/deleteStudent", deteteStudentController);
studentRouter.get("/getStudent", getStudentController);
studentRouter.put("/updateStudent", updateStudentController);
studentRouter.get("/getListClassStudents", getListClassStudentsController);
studentRouter.get("/getStudentSearch", getStudentSearchController);

module.exports = studentRouter;
