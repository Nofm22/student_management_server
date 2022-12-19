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
                "Scores", // table name
                "semesterOne", // new field brand
                {
                    allowNull: false,
                    type: Sequelize.BOOLEAN,
                }
            ),
            queryInterface.addColumn(
                "Scores", // table name
                "semesterTwo", // new field brand
                {
                    allowNull: false,
                    type: Sequelize.BOOLEAN,
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
        return Promise.all(
            [queryInterface.removeColumn("Scores", "semesterOne")],
            [queryInterface.removeColumn("Scores", "semesterTwo")]
        );
    },
};
