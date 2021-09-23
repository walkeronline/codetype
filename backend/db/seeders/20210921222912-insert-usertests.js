'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		/*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
		return queryInterface.bulkInsert(
			'UserTests',
			[
				{
					userId: 2,
					testId: 1,
					wpm: 100,
					accuracy: 100,
					time: 35,
				},
				{
					userId: 2,
					testId: 2,
					wpm: 5,
					accuracy: 55,
					time: 290,
				},
				{
					userId: 2,
					testId: 3,
					wpm: 300,
					accuracy: 96,
					time: 5,
				},
			],
			{}
		);
	},

	down: (queryInterface, Sequelize) => {
		/*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
		return queryInterface.bulkDelete('UserTests', null, {
			truncate: true,
			cascade: true,
			restartIdentity: true,
		});
	},
};
