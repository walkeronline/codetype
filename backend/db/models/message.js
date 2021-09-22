'use strict';
module.exports = (sequelize, DataTypes) => {
	const Message = sequelize.define(
		'Message',
		{
			userId: { allowNull: false, type: DataTypes.INTEGER },
			friendId: { allowNull: false, type: DataTypes.INTEGER },
			message: { allowNull: false, type: DataTypes.STRING },
		},
		{}
	);
	Message.associate = function (models) {
		// associations can be defined here
	};
	return Message;
};
