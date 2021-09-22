'use strict';
module.exports = (sequelize, DataTypes) => {
	const Test = sequelize.define(
		'Test',
		{
			title: {
				allowNull: false,
				type: DataTypes.STRING,
				validates: {
					len: [1, 255],
				},
			},
			body: {
				allowNull: false,
				type: DataTypes.STRING,
				validates: {
					len: [1, 1000],
				},
			},
			language: {
				allowNull: false,
				type: DataTypes.STRING,
				validates: {
					len: [1, 25],
				},
			},
			charCount: {
				allowNull: false,
				type: DataTypes.INTEGER,
			},
		},
		{}
	);
	Test.associate = function (models) {
		// associations can be defined here
	};
	return Test;
};
