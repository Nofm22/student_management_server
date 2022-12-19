const { User, Teacher, Course, Class } = require("../models/index.js");
const bcrypt = require("bcrypt");

const createUser = async (data) => {
    const {
        username,
        password,
        name,
        email,
        date,
        className,
        courseName,
        gradeId,
    } = data;
    return new Promise(async (resolve, reject) => {
        try {
            const user = await User.findOne({
                where: {
                    username,
                },
            });
            if (user) {
                reject("Username is existed.");
            } else {
                const salt = bcrypt.genSaltSync(10);
                const hashPassword = bcrypt.hashSync(password, salt);
                const newUser = await User.create({
                    username,
                    password: hashPassword,
                });
                const dataCourse = await Course.findOne({
                    where: {
                        name: courseName,
                    },
                });
                // const dataClass = await Class.findOne({
                //     where: {
                //         name: className,
                //     },
                // });
                if (dataCourse) {
                    const newTeacher = await Teacher.create({
                        name,
                        date,
                        email,
                        gradeId: gradeId,
                        courseId: dataCourse.id,
                        userId: newUser.id,
                        classId: 1,
                    });
                    resolve({
                        newUser: newUser,
                        teacher: newTeacher,
                    });
                }
            }
        } catch (e) {
            console.log(e);
            reject({});
        }
    });
};
const userLogin = async (data) => {
    const { username, password } = data;
    return new Promise(async (resolve, reject) => {
        try {

            console.log(data)

            const user = await User.findOne({
                where: { username },
            });
            if (user) {
                const match = await bcrypt.compare(password, user.password);
                if (match) {
                    resolve({
                        detail: user,
                        status: true,
                    });
                } else {
                    resolve({
                        status: false,
                    });
                }
            } else {
                resolve({ status: false });
            }
        } catch (e) {
            reject({
                statusCode: 500,
                message: "Something went wrong.",
            });
        }
    });
};
const getUsers = async () => {
    return new Promise(async (resolve, reject) => {
        const allUser = await User.findAll({
            attributes: { exclude: ["password"] },
        });
        if (allUser) {
            resolve(allUser);
        } else {
            reject([]);
        }
    });
};
const deleteUserService = async (id) => {
    return new Promise(async (resolve, reject) => {
        const user = await User.findOne({
            where: {
                id,
            },
        });
        if (user) {
            await user.destroy({ force: true });
            resolve(true);
        } else {
            reject(false);
        }
    });
};
const updateUserService = async (user) => {
    const { username, lastName, phone, id, avatar, type } = user;
    return new Promise(async (resolve, reject) => {
        const user = await User.findOne({
            where: { id },
        });
        if (user) {
            await user.update({
                username,
                lastName,
                phone,
                avatar,
                type,
            });
            await user.save();
            resolve(user);
        } else {
            reject(false);
        }
    });
};

module.exports = {
    createUser,
    userLogin,
    getUsers,
    deleteUserService,
    updateUserService,
};
