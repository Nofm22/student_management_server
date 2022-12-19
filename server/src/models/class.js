"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Class extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Class.hasMany(models.Student, {
                as: "students",
                foreignKey: "ClassId",
            });
            Class.belongsTo(models.Grade, {
                foreignKey: "GradeId",
                as: "grades",
            });
            Class.hasOne(models.Teacher, {
                as: "teachers",
                foreignKey: "ClassId",
            });
        }
    }
    Class.init(
        {
            gradeId: DataTypes.INTEGER,
            name: DataTypes.STRING,
            numberStudent: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "Class",
        }
    );
    return Class;
};
