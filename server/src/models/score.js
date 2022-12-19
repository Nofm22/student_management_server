"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Score extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Score.belongsTo(models.Student, {
                foreignKey: "StudentId",
                as: "students",
            });
            Score.belongsTo(models.Course, {
                foreignKey: "CourseId",
                as: "courses",
            });
        }
    }
    Score.init(
        {
            courseId: DataTypes.INTEGER,
            exam15: DataTypes.FLOAT,
            exam45: DataTypes.FLOAT,
            examFinal: DataTypes.FLOAT,
            studentId: DataTypes.INTEGER,
            semesterOne: DataTypes.BOOLEAN,
            semesterTwo: DataTypes.BOOLEAN,
        },
        {
            sequelize,
            modelName: "Score",
        }
    );
    return Score;
};
