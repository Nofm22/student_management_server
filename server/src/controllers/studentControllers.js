const {
    createStudentService,
    deleteStudentService,
    getStudentsService,
    updateStudentService,
    getListClassStudentsService,
    getStudentSearchService,
} = require("../services/studentServices");

const createStudentController = async (req, res) => {
    try {
        const newStudent = await createStudentService(req.body);
        res.status(200).send({
            statusCode: 200,
            data: newStudent,
        });
    } catch (e) {
        console.log(e);
        res.status(400).send({
            statusCode: 400,
            "message:": "Class is full.",
        });
    }
};
const deteteStudentController = async (req, res) => {
    const { id } = req.query;
    try {
        await deleteStudentService(id);
        res.status(200).send({
            statusCode: 200,
            message: "Successfully.",
        });
    } catch (e) {
        console.log(e);
        res.status(404).send({
            statusCode: 404,
            "message:": "Not found.",
        });
    }
};
const getStudentController = async (req, res) => {
    const { id } = req.query;
    try {
        const student = await getStudentsService(+id);
        res.status(200).send({
            statusCode: 200,
            data: student,
        });
    } catch (e) {
        console.log(e);
        res.status(404).send({
            statusCode: 404,
            "message:": "Not found",
        });
    }
};
const updateStudentController = async (req, res) => {
    const { id } = req.query;
    try {
        const student = await updateStudentService(+id, req.body);
        res.status(200).send({
            statusCode: 200,
            data: student,
        });
    } catch (e) {
        console.log(e);
        res.status(400).send({
            statusCode: 400,
            "message:": "class is full.",
        });
    }
};

const getListClassStudentsController = async (req, res) => {
    const className = req.query;

    try {
        const students = await getListClassStudentsService(className);
        res.status(200).send({
            statusCode: 200,
            data: students,
        });
    } catch (e) {
        console.log(e);
        res.status(404).send({
            statusCode: 404,
            "message:": "Not found.",
        });
    }
};
const getStudentSearchController = async (req, res) => {
    const studentName = req.query.studentName;

    try {
        const students = await getStudentSearchService(studentName);
        res.status(200).send({
            statusCode: 200,
            data: students,
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
    createStudentController,
    deteteStudentController,
    getStudentController,
    updateStudentController,
    getStudentSearchController,
    getListClassStudentsController,
};
