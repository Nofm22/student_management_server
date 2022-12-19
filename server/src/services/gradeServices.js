const { Grade } = require("../models/index");

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
const getGradesService = (id) => {
    return new Promise(async (resolve, reject) => {
        if (id === -1) {
            const allClasses = await Grade.findAll();
            resolve(allClasses);
        } else {
            const grade = await Grade.findOne({
                where: {
                    id,
                },
            });
            if (grade) {
                resolve(grade);
            } else {
                reject({});
            }
        }
    });
};
module.exports = {
    createGradeService,
    getGradesService,
};
