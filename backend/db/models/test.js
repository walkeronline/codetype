'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Test extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			Test.belongsTo(models.User, { foreignKey: 'userId' });
		}
	}
	Test.init(
		{
			title: DataTypes.STRING,
			body: DataTypes.STRING,
			userId: DataTypes.INTEGER,
			language: DataTypes.STRING,
			charCount: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: 'Test',
		}
	);
	return Test;
};
