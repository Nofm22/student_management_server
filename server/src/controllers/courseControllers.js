const { deleteClassService } = require("../services/classServices");
const {
    createCourseService,
    getCoursesService,
    getCoursesSummaryService,
    deleteCourseService,
    getCoursesByGradeService,
    updateCourseService,
} = require("../services/courseServices");

const createCourseController = async (req, res) => {
    try {
        const course = await createCourseService(req.body);
        res.status(200).send({
            statusCode: 200,
            data: course,
        });
    } catch (e) {
        console.log(e);
        res.status(500).send({
            statusCode: 500,
            "message:": "Something went wrong.",
        });
    }
};

const deleteCourseController = async (req, res) => {
    try {
        const course = await deleteCourseService(req.query);
        res.status(200).send({
            statusCode: 200,
            data: course,
        });
    } catch (e) {
        console.log(e);
        res.status(500).send({
            statusCode: 500,
            "message:": "Something went wrong.",
        });
    }
};
const getCoursesController = async (req, res) => {
    const { id } = req.query;
    try {
        const courses = await getCoursesService(+id);
        res.status(200).send({
            statusCode: 200,
            data: courses,
        });
    } catch (e) {
        console.log(e);
        res.status(404).send({
            statusCode: 404,
            "message:": "Not found.",
        });
    }
};
const getCoursesByGradeController = async (req, res) => {
    const { gradeId } = req.query;
    try {
        const courses = await getCoursesByGradeService(+gradeId);
        res.status(200).send({
            statusCode: 200,
            data: courses,
        });
    } catch (e) {
        console.log(e);
        res.status(404).send({
            statusCode: 404,
            "message:": "Not found.",
        });
    }
};
const getCoursesSummaryController = async (req, res) => {
    const { courseName, semesterOne, semesterTwo } = req.query;
    try {
        const results = await getCoursesSummaryService(
            courseName,
            +semesterOne,
            +semesterTwo
        );
        res.status(200).send({
            statusCode: 200,
            data: results,
        });
    } catch (e) {
        console.log(e);
        res.status(404).send({
            statusCode: 404,
            "message:": "Not found.",
        });
    }
};
const updateCourseController = async (req, res) => {
    try {
        const results = await updateCourseService(req.body);
        res.status(200).send({
            statusCode: 200,
            data: results,
        });
    } catch (e) {
        console.log(e);
        res.status(404).send({
            statusCode: 404,
            "message:": "Not found.",
        });
    }
};
module.exports = {
    deleteCourseController,
    createCourseController,
    getCoursesByGradeController,
    getCoursesController,
    updateCourseController,
    getCoursesSummaryController,
};
