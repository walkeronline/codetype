'use strict';
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('userTests', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			userId: {
				allowNull: false,
				type: Sequelize.INTEGER,
			},
			testId: {
				allowNull: false,
				type: Sequelize.INTEGER,
			},
			wpm: {
				allowNull: false,
				type: Sequelize.INTEGER,
			},
			accuracy: {
				allowNull: false,
				type: Sequelize.INTEGER,
			},
			time: {
				allowNull: false,
				type: Sequelize.INTEGER,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
				defaultValue: Sequelize.fn('now'),
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
				defaultValue: Sequelize.fn('now'),
			},
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('userTests');
	},
};
