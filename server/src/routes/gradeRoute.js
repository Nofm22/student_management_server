const express = require("express");
const {
    createGradeController,
    getGradeController,
    updateGradeController
} = require("../controllers/gradeController");

const gradeRouter = express.Router();

gradeRouter.post("/createGrade", createGradeController);
gradeRouter.put("/updateGrade", updateGradeController);
gradeRouter.get("/getGrades", getGradeController);

module.exports = {
    gradeRouter,
};
