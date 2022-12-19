"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Teacher extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Teacher.belongsTo(models.Class, {
                foreignKey: "ClassId",
                as: "classes",
            });
        }
    }
    Teacher.init(
        {
            name: DataTypes.STRING,
            gender: DataTypes.BOOLEAN,
            date: DataTypes.DATE,
            address: DataTypes.STRING,
            email: DataTypes.STRING,
            classId: DataTypes.INTEGER,
            courseId: DataTypes.INTEGER,
            userId: DataTypes.INTEGER,
            gradeId: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "Teacher",
        }
    );
    return Teacher;
};
