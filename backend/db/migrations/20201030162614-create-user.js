'use strict';
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('Users', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			username: {
				allowNull: false,
				type: Sequelize.STRING(255),
				unique: true,
			},
			displayName: {
				allowNull: false,
				type: Sequelize.STRING(255),
				unique: false,
			},
			email: {
				allowNull: false,
				type: Sequelize.STRING(255),
				unique: true,
			},
			location: {
				allowNull: true,
				type: Sequelize.STRING(255),
				unique: false,
			},
			imageUrl: {
				allowNull: true,
				type: Sequelize.STRING(255),
				unique: false,
			},
			hashedPassword: {
				allowNull: false,
				type: Sequelize.STRING(60).BINARY,
			},
			online: {
				allowNull: false,
				type: Sequelize.BOOLEAN,
				defaultValue: false,
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
		return queryInterface.dropTable('Users');
	},
};
