const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');

const { Test, sequelize } = require('../../db/models');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validateTest = [
	check('title')
		.exists({ checkFalsy: true })
		.withMessage('Please provide a title.')
		.isLength({ min: 1, max: 255 })
		.withMessage('Title must be between 1-255 characters.'),
	check('body')
		.exists({ checkFalsy: true })
		.withMessage('Please provide a body.')
		.isLength({ min: 10, max: 1000 })
		.withMessage('Body must be between 10-1000 characters.'),
	check('language')
		.exists({ checkFalsy: true })
		.withMessage('Please pick a language.'),
	check('charCount')
		.exists({ checkFalsy: true })
		.withMessage('Please provide a character count.'),
	handleValidationErrors,
];

router.get(
	'/random',
	asyncHandler(async (req, res) => {
		const randomTest = await Test.findOne({
			order: [[sequelize.fn('RANDOM')]],
		});

		return res.json({
			randomTest,
		});
	})
);

router.get(
	'/:testId',
	asyncHandler(async (req, res) => {
		const { testId } = req.params;
		const test = await Test.findByPk(+testId);

		return res.json({
			test,
		});
	})
);

router.post(
	'/',
	validateTest,
	asyncHandler(async (req, res) => {
		const { title, body, userId, language, charCount } = req.body;
		const test = await Test.create({
			title,
			body,
			userId,
			language,
			charCount,
		});

		return res.json({
			id: test.id,
			title,
			body,
			userId,
			language,
			charCount,
			createdAt: test.createdAt,
			updatedAt: test.updatedAt,
		});
	})
);

router.put(
	'/',
	validateTest,
	asyncHandler(async (req, res) => {
		const { id, title, body, language, charCount } = req.body;
		const test = await Test.findByPk(id);
		test.title = title;
		test.body = body;
		test.language = language;
		test.charCount = charCount;

		await test.save();

		return res.json({
			id,
			title: test.title,
			body: test.body,
			userId: test.userId,
			language: test.language,
			charCount: test.charCount,
			createdAt: test.createdAt,
			updatedAt: test.updatedAt,
		});
	})
);

router.delete(
	'/',
	asyncHandler(async (req, res) => {
		const { id } = req.body;
		const test = await Test.findByPk(id);
		await test.destroy();

		return res.json({
			test,
		});
	})
);

module.exports = router;
