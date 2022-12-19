const {
    createUser,
    userLogin,
    getUsers,
    deleteUserService,
    updateUserService,
} = require("../services/userServices");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const Register = async (req, res) => {
    try {
        const { newUser, teacher } = await createUser(req.body);
        const token = jwt.sign(
            {
                id: newUser.id,
                username: newUser.username,
            },
            process.env.TOKEN_SECRET_KEY,
            {
                expiresIn: "24h",
            }
        );
        res.status(200).send({
            statusCode: 200,
            token,
            user: newUser,
            teacher: teacher,
        });
    } catch (e) {
        console.log(e);
        res.status(500).send({
            statusCode: 500,
            "message:": e,
        });
    }
};

const Login = async (req, res) => {
    try {
        const user = await userLogin(req.body);
        if (user.status) {
            const token = jwt.sign(
                {
                    id: user.detail.id,
                    username: user.detail.username,
                },
                process.env.TOKEN_SECRET_KEY,
                {
                    expiresIn: "24h",
                }
            );

            return res.status(200).send({
                statusCode: 200,
                user: user.detail,
                message: "Login successfully",
                token,
            });
        } else {
            return res.status(401).send({
                statusCode: 401,
                message: "email or password is incorrect",
            });
        }
    } catch (e) {
        res.status(500).send({
            statusCode: 500,
            "message:": "Something went wrong1.",
        });
    }
};
const getAllUsers = async (req, res) => {
    try {
        const allUser = await getUsers();
        res.status(200).send({
            statusCode: 200,
            message: allUser,
        });
    } catch (e) {
        res.status(404).send({
            statusCode: 404,
            message: "Not found",
        });
    }
};
const deleteUser = async (req, res) => {
    const { id } = req.query;
    try {
        const user = await deleteUserService(id);
        res.status(200).send({
            statusCode: 200,
            message: "Successfully.",
        });
    } catch (e) {
        res.status(404).send({
            statusCode: 404,
            message: "Not found",
        });
    }
};
const auth = (req, res) => {
    res.status(200).json({
        statusCode: 200,
        data: req.data,
    });
};
const updateUser = async (req, res) => {
    try {
        const user = await updateUserService(req.body);
        res.status(200).send({
            statusCode: 200,
            message: "Successfully.",
            user,
        });
    } catch (e) {
        res.status(404).send({
            statusCode: 404,
            message: "Not found",
        });
    }
};

module.exports = {
    Register,
    Login,
    getAllUsers,
    auth,
    deleteUser,
    updateUser,
};
