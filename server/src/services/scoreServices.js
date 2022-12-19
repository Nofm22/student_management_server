const { Score, sequelize, Student, Class, Course } = require("../models/index");
const { QueryTypes } = require("sequelize");
const fs = require("fs");
const createScoreService = async (data) => {
    const {
        studentId,
        courseName,
        exam15,
        exam45,
        examFinal,
        semesterOne,
        semesterTwo,
    } = data;

    return new Promise(async (resolve, reject) => {
        try {
            const student = await Student.findOne({
                where: {
                    id: studentId,
                },
                raw: true,
            });
            if (student) {
                const { classId } = student;
                const grade = await Class.findOne({
                    where: {
                        id: classId,
                    },
                    raw: true,
                });
                if (grade) {
                    const { gradeId } = grade;
                    const { id: courseId } = await Course.findOne({
                        where: {
                            name: courseName,
                            gradeId,
                        },
                        raw: true,
                    });
                    const newScore = await Score.create({
                        studentId,
                        courseId,
                        exam15,
                        exam45,
                        examFinal,
                        semesterOne,
                        semesterTwo,
                    });
                    resolve(newScore);
                } else {
                    reject(false);
                }
            } else {
                reject(false);
            }
        } catch (e) {
            reject(false);
        }
    });
};
const createMultipleScoreService = async (data) => {
    data = await Promise.all(
        data.map(async (item, index) => {
            try {
                const student = await Student.findOne({
                    where: {
                        id: item.studentId,
                    },
                    raw: true,
                });
                if (student) {
                    const { classId } = student;
                    const grade = await Class.findOne({
                        where: {
                            id: classId,
                        },
                        raw: true,
                    });
                    if (grade) {
                        const { gradeId } = grade;
                        const { id: courseId } = await Course.findOne({
                            where: {
                                name: item.courseName,
                                gradeId,
                            },
                            raw: true,
                        });
                        delete item.courseName;
                        return {
                            ...item,
                            courseId,
                        };
                    } else {
                        //reject(false);
                        console.log(false);
                    }
                } else {
                    //reject(false);
                    console.log(false);
                }
            } catch (e) {
                //reject(false);
                console.log(e);
            }
        })
    );
    return new Promise(async (resolve, reject) => {
        try {
            const newScore = await Score.bulkCreate(data, { returning: true });
            resolve(newScore);
        } catch (e) {
            console.log(e);
            reject(false);
        }
    });
};
const deleteScoreService = async (scoreId) => {
    return new Promise(async (resolve, reject) => {
        const score = await Score.findOne({
            where: {
                id: scoreId,
            },
        });
        if (score) {
            await score.destroy({ force: true });
            resolve(true);
        } else {
            reject(false);
        }
    });
};
const getScoreService = async (scoreId) => {
    return new Promise(async (resolve, reject) => {
        if (scoreId === -1) {
            const allScores = await Score.findAll();
            resolve(allScores);
        } else {
            const score = await Score.findOne({
                where: {
                    id: scoreId,
                },
            });
            if (score) {
                resolve(score);
            } else {
                reject({});
            }
        }
    });
};
const updateScoreService = async (id, data) => {
    const {
        courseId,
        exam15,
        exam45,
        examFinal,
        studentId,
        semesterOne,
        semesterTwo,
    } = data;
    return new Promise(async (resolve, reject) => {
        const score = await Score.findOne({
            where: { id },
        });
        if (score) {
            await score.update({
                courseId,
                exam15,
                exam45,
                examFinal,
                studentId,
                semesterOne,
                semesterTwo,
            });
            await score.save();
            resolve(score);
        } else {
            reject({});
        }
    });
};
const getScoreForStudentByCourse = (id, courseId, semesterOne, semesterTwo) => {
    return new Promise(async (resolve, reject) => {
        try {
            const scores = await Score.findOne({
                where: {
                    studentId: id,
                    courseId,
                    semesterOne,
                    semesterTwo,
                },
                raw: true,
            });
            if (scores) {
                resolve(scores);
            } else {
                resolve({
                    studentId: id,
                    courseId,
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};
const getAVGScoreByCourseService = (
    courseName,
    className,
    semesterOne,
    semesterTwo
) => {
    return new Promise(async (resolve, reject) => {
        try {
            const data = await Class.findOne({
                where: {
                    name: className,
                },
                raw: true,
            });
            if (data) {
                const { id: classId, gradeId } = data;
                const { id: courseId } = await Course.findOne({
                    where: {
                        gradeId,
                        name: courseName,
                    },
                });

                let students = await Student.findAll({
                    where: {
                        classId,
                    },
                    raw: true,
                });
                students = await Promise.all(
                    students.map(async (student) => {
                        try {
                            const data = await getScoreForStudentByCourse(
                                student.id,
                                courseId,
                                semesterOne,
                                semesterTwo
                            );
                            return {
                                ...data,
                                name: student.name,
                                gender: student.gender,
                            };
                        } catch (e) {
                            reject(e);
                        }
                    })
                );
                resolve(students);
            }
        } catch (e) {
            console.log(e);
            reject(e);
        }
    });
};
const getAllStudentScoreService = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const students = await Student.findAll({
                raw: true,
            });
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
            resolve(studentScores);
        } catch (e) {
            console.log(e);
            reject("Error from sever.");
        }
    });
};
const getAVGScoreService = (id) => {
    return new Promise(async (resolve, reject) => {
        let scores = await Score.findAll({
            where: {
                studentId: id,
            },
            raw: true,
        });
        const student = await Student.findOne({
            where: {
                id,
            },
            raw: true,
        });
        scores = await Promise.all(
            scores.map(async (score) => {
                let avgScore =
                    (score.exam15 + score.exam45 * 2 + score.examFinal * 3) / 6;
                const course = await Course.findOne({
                    where: {
                        id: score.courseId,
                    },
                    raw: true,
                });
                delete score.courseId;
                delete score.studentId;
                delete score.CourseId;
                delete score.StudentId;

                return {
                    ...score,
                    avgScore: Math.round(avgScore),
                    courseName: course.name,
                };
            })
        );
        let count = await Course.count({
            where: {
                gradeId: 1,
            },
        });
        let avgTerm1 = 0;
        let avgTerm2 = 0;
        let count1 = 0;
        let count2 = 0;
        scores.forEach((item) => {
            if (item.semesterOne === 1) {
                avgTerm1 += item.avgScore;
                count1++;
            } else {
                avgTerm2 += item.avgScore;
                count2++;
            }
        });
        avgTerm1 = Math.round(avgTerm1 / count1);
        avgTerm2 = Math.round(avgTerm2 / count2);
        let avg =
            avgTerm1 !== 0 && avgTerm2 !== 0
                ? Math.round((avgTerm2 + avgTerm1) / 2)
                : 0;
        let type = "";
        if (avg < 5 && avg > 0) {
            type = "Below average";
        } else if (avg >= 5 && avg <= 6.5) {
            type = "Average";
        } else if (avg > 6.5 && avg <= 8) {
            type = "Fairly good";
        } else if (avg > 8 && avg <= 9) {
            type = "Good";
        } else if (avg > 9 && avg <= 10) {
            type = "Excellent";
        } else {
            type = "Null";
        }
        resolve({ scores, avgTerm1, avgTerm2, avg, type });
        try {
        } catch (e) {
            reject(e);
        }
    });
};
const getSemesterSummaryService = (semesterOne, semesterTwo) => {
    return new Promise(async (resolve, reject) => {
        try {
            results = [];
            const classes = await Class.findAll();

            for (let i = 0; i < classes.length; i++) {
                passCount = 0;

                students = await Student.findAll({
                    where: { classId: classes[i].id },
                });

                numOfStudents = students.length;
                for (let j = 0; j < numOfStudents; j++) {
                    score = await getAVGScoreService(students[j].id);

                    if (semesterOne == 1 && semesterTwo == 0) {
                        if (score.avgTerm1 >= 5) passCount++;
                    } else {
                        if (score.avgTerm2 >= 5) passCount++;
                    }
                }

                let ratio = passCount / students.length;
                classInfo = {
                    className: classes[i].name,
                    numOfStudents: numOfStudents,
                    numOfPass: passCount,
                    ratio: Math.round(ratio * 100) + "%",
                };
                results.push(classInfo);
            }
            if (results) resolve(results);
            else reject({});
        } catch (e) {
            reject(e);
        }
    });
};

module.exports = {
    createScoreService,
    deleteScoreService,
    getScoreService,
    updateScoreService,
    createMultipleScoreService,
    getAVGScoreService,
    getAVGScoreByCourseService,
    getAllStudentScoreService,
    getSemesterSummaryService,
};
