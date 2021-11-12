const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const crypto = require('crypto');

const { Message, User, sequelize } = require('../../db/models');
const { handleValidationErrors } = require('../../utils/validation');

const { Op } = require('sequelize');

const router = express.Router();

function getRoomId(userId, friendId) {
	const min = Math.min(userId, friendId);
	const max = Math.max(userId, friendId);
	let toHash = `${min}${max}`;
	return crypto.createHash('sha256').update(toHash).digest('hex');
}

router.get(
	'/:userId/:friendId',
	asyncHandler(async (req, res) => {
		const { userId, friendId } = req.params;
		console.log(userId, friendId);
		const messages = await Message.findAll({
			where: {
				roomId: getRoomId(userId, friendId),
			},
			include: [
				{ model: User, as: 'friendM' },
				{ model: User, as: 'userM' },
			],
		});

		return res.json(
			messages.sort((a, b) => new Date(a.updatedAt) - new Date(b.updatedAt))
		);
	})
);

module.exports = router;
