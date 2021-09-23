const express = require('express');
const asyncHandler = require('express-async-handler');

const { Test, sequelize } = require('../../db/models');

const router = express.Router();

router.get(
	'/',
	asyncHandler(async (req, res) => {
		const randomTest = await Test.findOne({
			order: [[sequelize.fn('RANDOM')]],
		});

		return res.json({
			randomTest,
		});
	})
);

module.exports = router;
