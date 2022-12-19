const { Sequelize } = require("sequelize");
const config = require("./config.json");

const sequelize = new Sequelize(
    config["development"].database,
    config["development"].username,
    config["development"].password,
    {
        host: "sql6.freesqldatabase.com",
        dialect: "mysql",
        logging: false,
    }
);

module.exports = sequelize;
