'use strict';

const NUM_USERS = 12;

const createFriends = () => {
	let data = [];
	for (let i = 1; i <= NUM_USERS; i++) {
		for (let j = 1; j <= NUM_USERS; j++) {
			if (i !== j) {
				data.push({
					userId: i,
					friendId: j,
				});
			}
		}
	}
	return data;
};

module.exports = {
	up: (queryInterface, Sequelize) => {
		/*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
		return queryInterface.bulkInsert('Friends', createFriends(), {});
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
