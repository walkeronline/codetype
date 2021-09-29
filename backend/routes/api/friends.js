const express = require('express');
const asyncHandler = require('express-async-handler');

const { Friend, User, sequelize } = require('../../db/models');
const { Op } = require('sequelize');

const router = express.Router();

router.get(
	'/:userId',
	asyncHandler(async (req, res) => {
		const { userId } = req.params;
		const friends = await Friend.findAll({
			where: {
				[Op.or]: [{ userId: userId }, { friendId: userId }],
			},
			include: [
				{ model: User, as: 'friend' },
				{ model: User, as: 'user' },
			],
		});

		return res.json(friends);
	})
);

router.post(
	'/',
	asyncHandler(async (req, res) => {
		const { id, username } = req.body;
		const user = await User.findOne({
			where: {
				username,
			},
		});

		const isFriend = await Friend.findOne({
			where: {
				[Op.or]: [
					{ userId: id, friendId: user.id },
					{ userId: user.id, friendId: id },
				],
			},
		});

		if (!isFriend && user) {
			const friend = await Friend.create({
				userId: id,
				friendId: user.id,
			});

			const friends = await Friend.findAll({
				where: {
					userId: id,
				},
				include: [{ model: User, as: 'friend' }],
			});

			return res.json({
				friends,
			});
		} else if (!user) {
			return res.json({
				errors: ["That user doesn't exist"],
			});
		}

		return res.json({
			errors: ['Already friends with this user.'],
		});
	})
);

router.delete(
	'/',
	asyncHandler(async (req, res) => {
		const { id } = req.body;
		const friend = await Friend.findByPk(id);
		await friend.destroy();
		return res.json({
			friend,
		});
	})
);

module.exports = router;
