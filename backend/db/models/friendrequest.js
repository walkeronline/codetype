'use strict';
module.exports = (sequelize, DataTypes) => {
	const FriendRequest = sequelize.define(
		'FriendRequest',
		{
			userId: { allowNull: false, type: DataTypes.INTEGER },
			friendId: { allowNull: false, type: DataTypes.INTEGER },
		},
		{}
	);
	FriendRequest.associate = function (models) {
		// associations can be defined here
	};
	return FriendRequest;
};
