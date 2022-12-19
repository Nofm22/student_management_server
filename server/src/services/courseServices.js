const { Course, Class, Student, Score } = require("../models/index");

const createCourseService = (data) => {
    return new Promise(async (resolve, reject) => {
        const { gradeId, name } = data;

        try {
            const newCourse = await Course.create({
                gradeId,
                name,
            });
            resolve(newCourse);
        } catch (e) {
            reject(false);
        }
    });
};

const deleteCourseService = async (id) => {
    return new Promise(async (resolve, reject) => {
        const courses = await Course.findOne({
            where: {
                id: +id.id,
            },
        });
        if (courses) {
            await courses.destroy({ force: true });
            resolve(true);
        } else {
            reject(false);
        }
    });
};
const getCoursesService = (id) => {
    return new Promise(async (resolve, reject) => {
        if (id === -1) {
            const courses = await Course.findAll();
            resolve(courses);
        } else {
            const courses = await Course.findOne({
                where: {
                    id,
                },
            });
            if (courses) {
                resolve(courses);
            } else {
                reject({});
            }
        }
    });
};
const getCoursesByGradeService = (id) => {
    return new Promise(async (resolve, reject) => {
        const courses = await Course.findAll({
            where: {
                gradeId: id,
            },
        });
        if (courses) {
            resolve(courses);
        } else {
            reject({});
        }
    });
};
const updateCourseService = (data) => {
    const { name, passScore, id } = data;
    return new Promise(async (resolve, reject) => {
        const course = await Course.findOne({
            where: { id },
        });
        if (course) {
            await course.update({
                name,
                passScore,
            });
            await course.save();
            resolve(course);
        } else {
            reject({});
        }
    });
};
const getCoursesSummaryService = (courseName, semesterOne, semesterTwo) => {
    return new Promise(async (resolve, reject) => {
        results = [];
        const classes = await Class.findAll();
        numOfClasses = classes.length;
        for (let i = 0; i < numOfClasses; i++) {
            course = await Course.findOne({
                where: {
                    name: courseName,
                    gradeId: classes[i].gradeId,
                },
            });

            passCount = 0;

            let students = await Student.findAll({
                where: { classId: classes[i].id },
            });
            numOfStudents = students.length;
            for (let j = 0; j < numOfStudents; j++) {
                let score = await Score.findOne({
                    where: {
                        studentId: students[j].id,
                        courseId: course.id,
                        semesterOne: semesterOne,
                        semesterTwo: semesterTwo,
                    },
                });

                if (score != null) {
                    if (score.exam15 == null) {
                        score.exam15 = 0;
                    }
                    if (score.exam45 == null) score.exam45 = 0;
                    if (score.examFinal == null) score.examFinal = 0;
                    avgScore =
                        (score.exam15 +
                            score.exam45 * 2 +
                            score.examFinal * 3) /
                        6;
                    if (avgScore >= course.passScore) passCount++;
                }
            }
            let ratio = passCount / students.length;
            classInfo = {
                name: classes[i].name,
                numOfStudents: numOfStudents,
                numOfPass: passCount,
                ratio: Math.round(ratio * 100) + "%",
            };
            results.push(classInfo);
        }

        if (results) resolve(results);
        else reject({});
    });
};

module.exports = {
    createCourseService,
    deleteCourseService,
    updateCourseService,
    getCoursesByGradeService,
    getCoursesService,
    getCoursesSummaryService,
};
