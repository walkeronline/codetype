const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');

const { Message, User, sequelize } = require('../../db/models');
const { handleValidationErrors } = require('../../utils/validation');

const { Op } = require('sequelize');

const router = express.Router();

router.get(
	'/:userId/:friendId',
	asyncHandler(async (req, res) => {
		const { userId, friendId } = req.params;
		const messages = await Message.findAll({
			where: {
				[Op.and]: {
					[Op.or]: [{ userId: userId }, { friendId: userId }],
					[Op.or]: [{ userId: friendId }, { friendId: friendId }],
				},
			},
			include: [
				{ model: User, as: 'friendM' },
				{ model: User, as: 'userM' },
			],
		});

		console.log(messages);

		return res.json(messages);
	})
);

module.exports = router;
