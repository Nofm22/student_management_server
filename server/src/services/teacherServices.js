const { Teacher, Grade, Class } = require("../models/index");

const createGradeService = async (data) => {
    const { name } = data;

    return new Promise(async (resolve, reject) => {
        try {
            const newGrade = await Grade.create({
                name,
            });

            resolve(newGrade);
        } catch (e) {
            reject(false);
        }
    });
};
const getTeacherService = (id) => {
    return new Promise(async (resolve, reject) => {
        if (id === -1) {
            const teachers = await Teacher.findAll();
            resolve(teachers);
        } else {
            const teacher = await Teacher.findOne({
                where: {
                    id,
                },
            });
            if (teacher) {
                resolve(teacher);
            } else {
                reject({});
            }
        }
    });
};
const deleteTeacherService = async (id) => {
    return new Promise(async (resolve, reject) => {
        const teachers = await Teacher.findOne({
            where: {
                id,
            },
        });
        if (teachers) {
            await teachers.destroy({ force: true });
            resolve(true);
        } else {
            reject(false);
        }
    });
};
const updateTeacherService = async (data) => {
    const { gradeId, name, numberStudent, id } = data;
    let classes = null;
    return new Promise(async (resolve, reject) => {
        if (id === "undefined") {
            classes = await Class.findOne({
                where: { name: name },
            });
        } else {
            classes = await Class.findOne({
                where: { id },
            });
        }

        if (classes) {
            await classes.update({
                gradeId,
                name,
                numberStudent,
            });
            await classes.save();
            resolve(classes);
        } else {
            reject({});
        }
    });
};
module.exports = {
    createGradeService,
    getTeacherService,
    deleteTeacherService,
    updateTeacherService,
};
