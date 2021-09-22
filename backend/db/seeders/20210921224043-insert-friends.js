'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		/*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
		return queryInterface.bulkInsert(
			'Friends',
			[
				{
					userId: 2,
					friendId: 3,
				},
				{
					userId: 2,
					friendId: 4,
				},
				{
					userId: 2,
					friendId: 5,
				},
				{
					userId: 2,
					friendId: 6,
				},
				{
					userId: 2,
					friendId: 7,
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
		return queryInterface.bulkDelete('Friends', null, {
			truncate: true,
			cascade: true,
			restartIdentity: true,
		});
	},
};
