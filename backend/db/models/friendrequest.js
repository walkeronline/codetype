'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class FriendRequest extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			FriendRequest.belongsTo(models.User, {
				as: 'friendR',
				foreignKey: 'friendId',
			});
			FriendRequest.belongsTo(models.User, {
				as: 'userR',
				foreignKey: 'userId',
			});
		}
	}
	FriendRequest.init(
		{
			userId: DataTypes.INTEGER,
			friendId: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: 'FriendRequest',
		}
	);
	return FriendRequest;
};
