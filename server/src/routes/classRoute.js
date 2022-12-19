const express = require("express");
const {
    getClassController,
    createClassController,
    deleteClassController,
    updateClassController,
    getListGradeClassesController,
    getAllClassesController,
    getNotFullClassesController,
    getClassCurSizeController,
    changeClassController,
    getAllStudentScoreController,
    getClassNumberStudent,
} = require("../controllers/classControllers");
const { getListGradeClassesService } = require("../services/classServices");

const classRouter = express.Router();

classRouter.get("/getClass", getClassController);
classRouter.post("/createClass", createClassController);
classRouter.delete("/deleteClass", deleteClassController);
classRouter.put("/updateClass", updateClassController);
classRouter.get("/getListGradeClasses", getListGradeClassesController);
classRouter.get("/getAllClasses", getAllClassesController);
classRouter.get("/getNotFullClasses", getNotFullClassesController);
classRouter.get("/getClassCurSize", getClassCurSizeController);
classRouter.put("/changeClass", changeClassController);
classRouter.get("/getClassNumberStudent", getClassNumberStudent);
module.exports = {
    classRouter,
};
