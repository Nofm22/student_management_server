const {
    getClassesService,
    createClassService,
    deleteClassService,
    updateClassService,
    getListGradeClassesService,
    getAllClassesService,
    getNotFullClassesService,
    getClassCurSizeService,
    changeClassService,
    getAllStudentScoreService,
    getClassNumberStudentService,
} = require("../services/classServices");

const getClassController = async (req, res) => {
    const { id } = req.query;
    try {
        const classes = await getClassesService(+id);
        res.status(200).send({
            statusCode: 200,
            data: classes,
        });
    } catch (e) {
        console.log(e);
        res.status(404).send({
            statusCode: 404,
            "message:": "Not found.",
        });
    }
};
const createClassController = async (req, res) => {
    try {
        const newClass = await createClassService(req.body);
        res.status(200).send({
            statusCode: 200,
            data: newClass,
        });
    } catch (e) {
        console.log(e);
        res.status(500).send({
            statusCode: 500,
            "message:": "Something went wrong.",
        });
    }
};
const deleteClassController = async (req, res) => {
    const { id } = req.query;
    try {
        await deleteClassService(id);
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
const updateClassController = async (req, res) => {
    try {
        const classes = await updateClassService(req.body);
        res.status(200).send({
            statusCode: 200,
            data: classes,
        });
    } catch (e) {
        console.log(e);
        res.status(404).send({
            statusCode: 404,
            "message:": "Not found.",
        });
    }
};

const getListGradeClassesController = async (req, res) => {
    const gradeName = req.query;
    try {
        const classes = await getListGradeClassesService(gradeName);
        res.status(200).send({
            statusCode: 200,
            data: classes,
        });
    } catch (e) {
        console.log(e);
        res.status(404).send({
            statusCode: 404,
            "message:": "Not found.",
        });
    }
};

const getAllClassesController = async (req, res) => {
    try {
        const classes = await getAllClassesService();
        res.status(200).send({
            statusCode: 200,
            data: classes,
        });
    } catch (e) {
        console.log(e);
        res.status(404).send({
            statusCode: 404,
            "message:": "Not found.",
        });
    }
};

const getNotFullClassesController = async (req, res) => {
    try {
        const classes = await getNotFullClassesService();
        res.status(200).send({
            statusCode: 200,
            data: classes,
        });
    } catch (e) {
        console.log(e);
        res.status(404).send({
            statusCode: 404,
            "message:": "Not found.",
        });
    }
};

const getClassCurSizeController = async (req, res) => {
    const gradeName = req.query;
    try {
        const data = await getClassCurSizeService(gradeName);
        res.status(200).send({
            statusCode: 200,
            data,
        });
    } catch (e) {
        console.log(e);
        res.status(500).send({
            statusCode: 500,
            "message:": "Something went wrong.",
        });
    }
};
const changeClassController = async (req, res) => {
    const { classId, studentId } = req.query;
    try {
        const data = await changeClassService(studentId, classId);
        res.status(200).send({
            statusCode: 200,
            data,
        });
    } catch (e) {
        console.log(e);
        res.status(500).send({
            statusCode: 500,
            "message:": e,
        });
    }
};
const getClassNumberStudent = async (req, res) => {
    const { name } = req.query;
    try {
        const data = await getClassNumberStudentService(name);
        res.status(200).send({
            statusCode: 200,
            data,
        });
    } catch (e) {
        console.log(e);
        res.status(404).send({
            statusCode: 500,
            "message:": e,
        });
    }
};

module.exports = {
    getClassController,
    createClassController,
    deleteClassController,
    updateClassController,
    getListGradeClassesController,
    getAllClassesController,
    getNotFullClassesController,
    getClassCurSizeController,
    changeClassController,
    getClassNumberStudent,
};
