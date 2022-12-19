const { User } = require("../models");

const isEmpty = async (req, res, next) => {
    const { username, password } = req.body;
    try {
        if (username === "" || password === "") {
            res.status(404).send({
                statusCode: 404,
                message: "Don't let the empty field.",
            });
        } else {
            next();
        }
    } catch (e) {
        res.status(500).send({
            statusCode: 500,
            message: "Something went wrong.",
        });
    }
};

module.exports = {
    isEmpty,
};
