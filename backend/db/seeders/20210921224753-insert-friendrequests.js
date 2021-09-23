'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		/*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
		return queryInterface.bulkInsert(
			'FriendRequests',
			[
				{
					userId: 2,
					friendId: 8,
				},
				{ userId: 2, friendId: 9 },
				{ userId: 2, friendId: 10 },
				{ userId: 11, friendId: 2 },
				{ userId: 12, friendId: 2 },
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
		return queryInterface.bulkDelete('FriendRequests', null, {
			truncate: true,
			cascade: true,
			restartIdentity: true,
		});
	},
};
