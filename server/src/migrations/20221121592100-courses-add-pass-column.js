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
                "Courses", // table name
                "passScore", // new field brand
                {
                    allowNull: false,
                    type: Sequelize.FLOAT,
                    defaultValue: 0,
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
            queryInterface.removeColumn("Courses", "passScore"),
        ]);
    },
};
