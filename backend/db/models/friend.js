'use strict';
module.exports = (sequelize, DataTypes) => {
	const Friend = sequelize.define(
		'Friend',
		{
			userId: { allowNull: false, type: DataTypes.INTEGER },
			friendId: { allowNull: false, type: DataTypes.INTEGER },
		},
		{}
	);
	Friend.associate = function (models) {
		// associations can be defined here
	};
	return Friend;
};
