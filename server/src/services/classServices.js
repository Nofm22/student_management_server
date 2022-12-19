const { Class, Student, sequelize } = require("../models/index");
const { QueryTypes } = require("sequelize");
const getClassesService = async (clasID) => {
    return new Promise(async (resolve, reject) => {
        if (clasID === -1) {
            const allClasses = await Class.findAll();
            resolve(allClasses);
        } else {
            const classes = await Class.findOne({
                where: {
                    id: clasID,
                },
            });
            if (classes) {
                resolve(classes);
            } else {
                reject({});
            }
        }
    });
};

const createClassService = async (data) => {
    const { gradeId, name, numberStudent } = data;
    return new Promise(async (resolve, reject) => {
        try {
            const newClass = await Class.create({
                gradeId,
                numberStudent,
                name: name.toUpperCase(),
            });

            resolve(newClass);
        } catch (e) {
            console.log(e);
            reject(false);
        }
    });
};

const deleteClassService = async (classid) => {
    return new Promise(async (resolve, reject) => {
        const classes = await Class.findOne({
            where: {
                id: classid,
            },
        });
        if (classes) {
            await classes.destroy({ force: true });
            resolve(true);
        } else {
            reject(false);
        }
    });
};

const updateClassService = async (data) => {
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

const getListGradeClassesService = async (gradeName) => {
    return new Promise(async (resolve, reject) => {
        try {
            const gradeId = await sequelize.query(
                "SELECT id as gradeId FROM `Grades` WHERE `name` = ?",
                {
                    replacements: [`${gradeName.name}`],
                    type: QueryTypes.SELECT,
                }
            );

            const gradeClasses = await Class.findAll({
                where: {
                    gradeId: gradeId[0].gradeId,
                },
                raw: true,
            });

            if (gradeClasses.length === 0) {
                reject("Not found.");
            } else {
                resolve(gradeClasses);
            }
        } catch (e) {
            reject("Error from sever.");
        }
    });
};

const getAllClassesService = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            const classes = await Class.findAll({
                raw: true,
            });

            if (classes.length === 0) {
                reject("Not found.");
            } else {
                resolve(classes);
            }
        } catch (e) {
            reject("Error from sever.");
        }
    });
};

const getNotFullClassesService = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            const classes = await sequelize.query(
                "SELECT DISTINCT cl.id, cl.gradeId, cl.name, cl.numberStudent, cl.createdAt, cl.updatedAt FROM student_management.Classes as cl where cl.numberStudent> (SELECT count(*) FROM student_management.Students as st2 where st2.classId = cl.id) or (SELECT count(*) FROM student_management.Students as st2 where st2.classId = cl.id) = 0 ",
                {
                    type: QueryTypes.SELECT,
                }
            );

            if (classes.length === 0) {
                reject("Not found.");
            } else {
                resolve(classes);
            }
        } catch (e) {
            reject("Error from sever.");
        }
    });
};
const getClassCurSizeService = async (gradeName) => {
    return new Promise(async (resolve, reject) => {
        try {
            const classes = await getListGradeClassesService(gradeName);
            const students = await Promise.all(
                classes.map(async (item) => {
                    const numberStudent = await Student.count({
                        where: {
                            ClassId: item.id,
                        },
                    });

                    return {
                        name: item.name,
                        curSize: numberStudent,
                        maxSize: item.numberStudent,
                    };
                })
            );
            resolve(students);
        } catch (e) {
            reject("Error from sever.");
        }
    });
};
const changeClassService = (studentId, nameClass) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { id: classId } = await Class.findOne({
                where: {
                    name: nameClass,
                },
            });

            // get current number of class
            const studentNumber = await Student.count({
                where: {
                    classId,
                },
            });
            const student = await Student.findOne({
                where: {
                    id: studentId,
                },
            });
            const getCurrentStudentOfClass = await Class.findOne({
                where: {
                    id: student.classId,
                },
            });
            const getMaxSizeOfClass = await Class.findOne({
                where: {
                    id: classId,
                },
            });

            if (
                studentNumber >= getMaxSizeOfClass.numberStudent ||
                student.classId === classId
            ) {
                reject("Can not change class.");
            } else {
                // let numberStudent = getCurrentStudentOfClass.numberStudent - 1;
                // await getCurrentStudentOfClass.update({
                //     numberStudent,
                // });
                await getCurrentStudentOfClass.save();
                await student.update({
                    classId,
                });

                await student.save();
                // await getMaxSizeOfClass.update({
                //     numberStudent: getMaxSizeOfClass.numberStudent + 1,
                // });
                // await getMaxSizeOfClass.save();
                resolve("Update successfully");
            }
        } catch (e) {
            console.log(e);
            reject("Error from sever.");
        }
    });
};
const getClassNumberStudentService = (name) => {
    return new Promise(async (resolve, reject) => {
        try {
            const classInfo = await Class.findOne({
                where: {
                    name,
                },
            });
            if (classInfo) {
                resolve(classInfo);
            } else {
                reject(false);
            }
        } catch (e) {
            console.log(e);
            reject(false);
        }
    });
};
module.exports = {
    getClassesService,
    createClassService,
    deleteClassService,
    updateClassService,
    getListGradeClassesService,
    getAllClassesService,
    getNotFullClassesService,
    getClassCurSizeService,
    changeClassService,
    getClassNumberStudentService,
};
