'use strict';
const { Model, Validator } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		toSafeObject() {
			const { id, username, email } = this; // context will be the User instance
			return { id, username, email };
		}
		validatePassword(password) {
			return bcrypt.compareSync(password, this.hashedPassword.toString());
		}
		static getCurrentUserById(id) {
			return User.scope('currentUser').findByPk(id);
		}
		static async login({ credential, password }) {
			const { Op } = require('sequelize');
			const user = await User.scope('loginUser').findOne({
				where: {
					[Op.or]: {
						username: credential,
						email: credential,
					},
				},
			});
			if (user && user.validatePassword(password)) {
				return await User.scope('currentUser').findByPk(user.id);
			}
		}
		static async signup({ username, email, password }) {
			const hashedPassword = bcrypt.hashSync(password);
			const user = await User.create({
				username,
				displayName: username,
				email,
				hashedPassword,
			});
			return await User.scope('currentUser').findByPk(user.id);
		}
		static associate(models) {
			// define association here
			User.hasMany(models.UserTest, { foreignKey: 'userId' });
			User.hasMany(models.Message, { as: 'friendM', foreignKey: 'friendId' });
			User.hasMany(models.Message, { as: 'userM', foreignKey: 'userId' });
			User.hasMany(models.Test, { foreignKey: 'userId' });
			User.hasMany(models.FriendRequest, {
				as: 'friendR',
				foreignKey: 'friendId',
			});
			User.hasMany(models.FriendRequest, {
				as: 'userR',
				foreignKey: 'userId',
			});
			User.hasMany(models.Friend, { as: 'friend', foreignKey: 'friendId' });
			User.hasMany(models.Friend, { as: 'user', foreignKey: 'userId' });
		}
	}
	User.init(
		{
			username: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					len: [4, 30],
					isNotEmail(value) {
						if (Validator.isEmail(value)) {
							throw new Error('Cannot be an email.');
						}
					},
				},
			},
			email: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					len: [3, 256],
				},
			},
			displayName: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			hashedPassword: {
				type: DataTypes.STRING.BINARY,
				allowNull: false,
				validate: {
					len: [60, 60],
				},
			},
		},
		{
			sequelize,
			modelName: 'User',
			defaultScope: {
				attributes: {
					exclude: ['hashedPassword', 'email', 'createdAt', 'updatedAt'],
				},
			},
			scopes: {
				currentUser: {
					attributes: { exclude: ['hashedPassword'] },
				},
				loginUser: {
					attributes: {},
				},
			},
		}
	);
	return User;
};
