"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("Scores", {
            id: {
                allowNull: false,
                autoIncrement: true,
                type: Sequelize.INTEGER,
                primaryKey: true,
            },
            courseId: {
                type: Sequelize.INTEGER,
                references: {model: "Courses", key:"id"},
            },
            exam15: {
                type: Sequelize.FLOAT,
            },
            exam45: {
                type: Sequelize.FLOAT,
            },
            examFinal: {
                type: Sequelize.FLOAT,
            },
            studentId: {
                type: Sequelize.INTEGER,
                references: { model: "Students", key: "id" },
            },
            // createdAt: {
            //     allowNull: false,
            //     type: Sequelize.DATE,
            // },
            // updatedAt: {
            //     allowNull: false,
            //     type: Sequelize.DATE,
            // },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("Scores");
    },
};
