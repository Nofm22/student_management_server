const {
    createGradeService,
    getGradesService,
} = require("../services/gradeServices");

const createGradeController = async (req, res) => {
    try {
        const newGrade = await createGradeService(req.body);
        res.status(200).send({
            statusCode: 200,
            data: newGrade,
        });
    } catch (e) {
        console.log(e);
        res.status(500).send({
            statusCode: 500,
            "message:": "Something went wrong.",
        });
    }
};
const getGradeController = async (req, res) => {
    const { id } = req.query;
    try {
        const grades = await getGradesService(+id);
        res.status(200).send({
            statusCode: 200,
            data: grades,
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
    createGradeController,
    getGradeController,
};
