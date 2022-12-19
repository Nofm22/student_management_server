const express = require("express");
const {
    createGradeController,
    getGradeController,
} = require("../controllers/gradeController");

const gradeRouter = express.Router();

gradeRouter.post("/createGrade", createGradeController);
gradeRouter.get("/getGrades", getGradeController);

module.exports = {
    gradeRouter,
};
