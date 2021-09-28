const express = require('express');
const asyncHandler = require('express-async-handler');

const { Friend, User, sequelize } = require('../../db/models');

const router = express.Router();

router.get(
	'/:userId',
	asyncHandler(async (req, res) => {
		const { userId } = req.params;
		const friends = await Friend.findAll({
			where: {
				userId: Number(userId),
			},
			include: [{ model: User, as: 'friend' }],
		});
		console.log(userId);
		return res.json(friends);
	})
);

module.exports = router;
