'use strict';
module.exports = (sequelize, DataTypes) => {
	const userTest = sequelize.define(
		'userTest',
		{
			userId: { allowNull: false, type: DataTypes.INTEGER },
			testId: { allowNull: false, type: DataTypes.INTEGER },
			wpm: { allowNull: false, type: DataTypes.INTEGER },
			accuracy: { allowNull: false, type: DataTypes.INTEGER },
			time: { allowNull: false, type: DataTypes.INTEGER },
		},
		{}
	);
	userTest.associate = function (models) {
		// associations can be defined here
	};
	return userTest;
};
