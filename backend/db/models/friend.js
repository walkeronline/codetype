'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Friend extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			Friend.belongsTo(models.User, { as: 'friend', foreignKey: 'friendId' });
			Friend.belongsTo(models.User, { as: 'user', foreignKey: 'userId' });
		}
	}
	Friend.init(
		{
			userId: DataTypes.INTEGER,
			friendId: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: 'Friend',
		}
	);
	return Friend;
};
