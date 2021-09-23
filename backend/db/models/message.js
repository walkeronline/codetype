'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Message extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			Message.belongsTo(models.User, { as: 'userM', foreignKey: 'userId' });
			Message.belongsTo(models.User, { as: 'friendM', foreignKey: 'friendId' });
		}
	}
	Message.init(
		{
			userId: DataTypes.INTEGER,
			friendId: DataTypes.INTEGER,
			message: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: 'Message',
		}
	);
	return Message;
};
