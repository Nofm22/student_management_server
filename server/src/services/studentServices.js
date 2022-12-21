const { Student, Class, Score,Grade, sequelize } = require("../models/index");
const { QueryTypes } = require("sequelize");
const Sequelize = require("sequelize");
const { getAVGScoreService } = require("./scoreServices");
const Op = Sequelize.Op;
const createStudentService = async (data) => {
    let { name, gender, date, address, email, classId } = data;

    return new Promise(async (resolve, reject) => {
        try {

            if (!isNumeric(classId)) {

                const { id } = await Class.findOne({
                    where: {
                        name: classId,
                    },
                });
                classId = id;
            }

            const count = await Student.count({
                where: { classId },
            });
            const { numberStudent } = await Class.findOne({
                where: {
                    id: classId,
                },
            });
            // const max = await sequelize.query(
            //     "SELECT `numberStudent` as number FROM `classes` WHERE `id` = ?",
            //     {
            //         replacements: [`${classId}`],
            //         type: QueryTypes.SELECT,
            //     }
            // );

            
            age = getAge(date)
            const { gradeId } = await Class.findOne({
                where: {
                    id: classId,
                }
            })

            const {minOld, maxOld} = await Grade.findOne({
                where: {
                    id:gradeId
                }
            })
            
            if (count >= numberStudent || age>maxOld || age<minOld) reject(false);
            else {
                const newStudent = await Student.create({
                    name,
                    gender,
                    date,
                    address,
                    email,
                    classId,
                });

                resolve(newStudent);
            }
        } catch (e) {
            console.log(e);
            reject(false);
        }
    });
};

function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

function isNumeric(str) {
    if (typeof str != "string") return false // we only process strings!  
    return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
           !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
  }

const deleteStudentService = async (studentId) => {
    return new Promise(async (resolve, reject) => {
        await Score.destroy({
            where: { studentId: studentId },
        });

        const student = await Student.findOne({
            where: {
                id: studentId,
            },
        });
        if (student) {
            await student.destroy({ force: true });
            resolve(true);
        } else {
            reject(false);
        }
    });
};
const getStudentsService = async (studentId) => {
    return new Promise(async (resolve, reject) => {
        if (studentId === -1) {
            const allStudents = await Student.findAll();
            resolve(allStudents);
        } else {
            const student = await Student.findOne({
                where: {
                    id: studentId,
                },
            });
            if (student) {
                resolve(student);
            } else {
                reject({});
            }
        }
    });
};
const updateStudentService = async (id, data) => {
    const { name, gender, date, address, email, classId } = data;
    return new Promise(async (resolve, reject) => {
        const student = await Student.findOne({
            where: { id },
        });
        if (student) {
            const count = await Student.count({
                where: { classId },
            });

            const max = await sequelize.query(
                "SELECT `numberStudent` as number FROM `Classes` WHERE `id` = ?",
                {
                    replacements: [`${classId}`],
                    type: QueryTypes.SELECT,
                }
            );

            if (count >= max[0].number) reject({});

            await student.update({
                name,
                gender,
                date,
                address,
                email,
                classId,
            });
            await student.save();
            resolve(student);
        } else {
            reject({});
        }
    });
};
const getListClassStudentsService = async (className) => {
    return new Promise(async (resolve, reject) => {
        try {
            const classId = await sequelize.query(
                "SELECT id as classId FROM `Classes` WHERE `name` = ?",
                {
                    replacements: [`${className.name}`],
                    type: QueryTypes.SELECT,
                }
            );
            if (classId && classId.length !== 0) {
                const classStudents = await Student.findAll({
                    where: {
                        classId: classId[0].classId,
                    },
                    raw: true,
                });
                if (classStudents.length === 0) {
                    reject("Not found.");
                } else {
                    resolve(classStudents);
                }
            }
        } catch (e) {
            console.log(e);
            reject("Error from sever.");
        }
    });
};

const getStudentSearchService = async (studentName) => {
    return new Promise(async (resolve, reject) => {
        try {
            studentName = toLowerCaseNonAccentVietnamese(studentName);

            const allStudents = await Student.findAll({
                raw: true,
            });

            let size = allStudents.length;

            const students = [];
            for (let i = 0; i < size; i++) {
                if (allStudents[i].name != null) {
                    let name = toLowerCaseNonAccentVietnamese(
                        allStudents[i].name
                    );
                    if (name.includes(studentName)) {
                        students.push(allStudents[i]);
                    }
                }
            }
            const studentScores = await Promise.all(
                students.map(async (student) => {
                    const score = await getAVGScoreService(student.id);
                    const className = await Class.findOne({
                        where: {
                            id: student.classId,
                        },
                        raw: true,
                    });
                    return {
                        ...student,
                        avg: score.avg,
                        type: score.type,
                        className: className.name,
                    };
                })
            );
            if (studentScores.length === 0) {
                reject("Not found.");
            } else {
                resolve(studentScores);
            }
        } catch (e) {
            console.log(e);

            reject("Error from sever.");
        }
    });
};

// This function converts the string to lowercase, then perform the conversion
function toLowerCaseNonAccentVietnamese(str) {
    str = str.toLowerCase();
    //     We can also use this instead of from line 11 to line 17
    //     str = str.replace(/\u00E0|\u00E1|\u1EA1|\u1EA3|\u00E3|\u00E2|\u1EA7|\u1EA5|\u1EAD|\u1EA9|\u1EAB|\u0103|\u1EB1|\u1EAF|\u1EB7|\u1EB3|\u1EB5/g, "a");
    //     str = str.replace(/\u00E8|\u00E9|\u1EB9|\u1EBB|\u1EBD|\u00EA|\u1EC1|\u1EBF|\u1EC7|\u1EC3|\u1EC5/g, "e");
    //     str = str.replace(/\u00EC|\u00ED|\u1ECB|\u1EC9|\u0129/g, "i");
    //     str = str.replace(/\u00F2|\u00F3|\u1ECD|\u1ECF|\u00F5|\u00F4|\u1ED3|\u1ED1|\u1ED9|\u1ED5|\u1ED7|\u01A1|\u1EDD|\u1EDB|\u1EE3|\u1EDF|\u1EE1/g, "o");
    //     str = str.replace(/\u00F9|\u00FA|\u1EE5|\u1EE7|\u0169|\u01B0|\u1EEB|\u1EE9|\u1EF1|\u1EED|\u1EEF/g, "u");
    //     str = str.replace(/\u1EF3|\u00FD|\u1EF5|\u1EF7|\u1EF9/g, "y");
    //     str = str.replace(/\u0111/g, "d");
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    // Some system encode vietnamese combining accent as individual utf-8 characters
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // Huyền sắc hỏi ngã nặng
    str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // Â, Ê, Ă, Ơ, Ư
    return str;
}

module.exports = {
    createStudentService,
    deleteStudentService,
    getStudentsService,
    updateStudentService,
    getStudentSearchService,
    getListClassStudentsService,
};
