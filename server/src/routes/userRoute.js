const express = require("express");
const {
    Register,
    Login,
    getAllUsers,
    auth,
    deleteUser,
    updateUser,
} = require("../controllers/userControllers");
const userRouter = express.Router();
const { verifyToken } = require("../middlewares/authenticate");
const { isEmpty } = require("../middlewares/userHandlers");
userRouter.post("/register", Register);
userRouter.get("/getAllUsers", getAllUsers);
userRouter.post("/login", isEmpty, Login);
userRouter.get("/verify-token", verifyToken, auth);
userRouter.delete("/deleteUser", deleteUser);
userRouter.put("/updateUser", updateUser);
module.exports = {
    userRouter,
};
