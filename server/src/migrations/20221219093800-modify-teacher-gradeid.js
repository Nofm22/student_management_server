"use strict";

module.exports = {
    async up(queryInterface, Sequelize) {
        /**
         * Add altering commands here.
         *
         * Example:
         * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
         */
        return Promise.all([
            queryInterface.addColumn(
                "Teachers", // table name
                "gradeId", // new field brand
                {
                    type: Sequelize.INTEGER,
                }
            ),
        ]);
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add reverting commands here.
         *
         * Example:
         * await queryInterface.dropTable('users');
         */
        return Promise.all([
            queryInterface.removeColumn("Teachers", "gradeId"),
        ]);
    },
};