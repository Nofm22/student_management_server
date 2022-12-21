"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Grade extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Grade.hasMany(models.Class, {
                as: "classes",
                foreignKey: "GradeId",
            });
            Grade.hasMany(models.Course, {
                as: "courses",
                foreignKey: "GradeId",
            });
        }
    }
    Grade.init(
        {
            name: DataTypes.STRING,
            minOld: DataTypes.INTEGER,
            maxOld: DataTypes.INTEGER
        },
        {
            sequelize,
            modelName: "Grade",
        }
    );
    return Grade;
};
