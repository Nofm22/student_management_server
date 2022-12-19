"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("Students", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            name: {
                type: Sequelize.STRING,
            },
            gender: {
                type: Sequelize.BOOLEAN,
            },
            date: {
                type: Sequelize.DATE,
            },
            address: {
                type: Sequelize.STRING,
            },
            email: {
                type: Sequelize.STRING,
            },
            classId: {
                type: Sequelize.INTEGER,
                references: { model: "Classes", key: "id" },
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
        await queryInterface.dropTable("Students");
    },
};
