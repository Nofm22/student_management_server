const express = require("express");
const {
    Register,
    Login,
    getAllUsers,
    auth,
    deleteUser,
    updateUser,
} = require("../controllers/userControllers");
const { verifyToken } = require("../middlewares/authenticate");
const {
    isExistEmail,
    isEmpty,
    isValidPhone,
} = require("../middlewares/userHanders");

const userRouter = express.Router();

// userRouter.post("/register", isValidPhone, isExistEmail, Register);
// userRouter.get("/getAllUsers", getAllUsers);
// userRouter.post("/login", isEmpty, Login);
// userRouter.get("/verify-token", verifyToken, auth);
// userRouter.delete("/deleteUser", deleteUser);
// userRouter.put("/updateUser", updateUser);

module.exports = {
    userRouter,
};
