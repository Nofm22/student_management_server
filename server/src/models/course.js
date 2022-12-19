"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Course extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Course.belongsTo(models.Grade, {
                foreignKey: "GradeId",
                as: "grades",
            });
            Course.hasMany(models.Score, {
                as: "scores",
                foreignKey: "CourseId",
            });
        }
    }
    Course.init(
        {
            gradeId: DataTypes.INTEGER,
            name: DataTypes.STRING,
            passScore: DataTypes.FLOAT,
        },
        {
            sequelize,
            modelName: "Course",
        }
    );
    return Course;
};
