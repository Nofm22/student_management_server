"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Student extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Student.hasMany(models.Score, {
                as: "scores",
                foreignKey: "StudentId",
            });
            Student.belongsTo(models.Class, {
                foreignKey: "ClassId",
                as: "classes",
            });
        }
    }
    Student.init(
        {
            name: DataTypes.STRING,
            gender: DataTypes.BOOLEAN,
            date: DataTypes.DATE,
            address: DataTypes.STRING,
            email: DataTypes.STRING,
            classId: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "Student",
        }
    );
    return Student;
};
