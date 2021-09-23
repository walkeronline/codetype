'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		/*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
		return queryInterface.bulkInsert(
			'Tests',
			[
				{
					title: 'Hello World!',
					body: "function helloWorld() { return console.log('Hello World!'); }",
					userId: 2,
					language: 'JavaScript',
					charCount: 61,
				},
				{
					title: 'Num Sum',
					body: 'function numSum(x, y) { return x + y; }',
					userId: 2,
					language: 'JavaScript',
					charCount: 39,
				},
				{
					title: 'For Loop Practice',
					userId: 2,
					body: 'function niceLoop(arr) { let sum = 0; for(let i = 0; i < arr.length; i++) { sum += arr[i]; } return sum; }',
					language: 'JavaScript',
					charCount: 106,
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
		return queryInterface.bulkDelete('Tests', null, {
			truncate: true,
			cascade: true,
			restartIdentity: true,
		});
	},
};
