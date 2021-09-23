'use strict';
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('Tests', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			title: {
				allowNull: false,
				type: Sequelize.STRING(255),
			},
			body: {
				allowNull: false,
				type: Sequelize.STRING(1000),
			},
			language: {
				allowNull: false,
				type: Sequelize.STRING(25),
			},
			charCount: {
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
		return queryInterface.dropTable('Tests');
	},
};
