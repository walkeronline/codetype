'use strict';

const bcrypt = require('bcryptjs');

function createPassword() {
	return bcrypt.hashSync('password');
}

function r(o) {
	o.createdAt = new Date();
	o.updatedAt = new Date();
	return o;
}

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert('Users', [
			r({
				username: 'demo',
				displayName: 'Demo Typer',
				email: 'demo@codetype.com',
				location: 'Unknown',
				imageUrl: '',
				online: false,
				hashedPassword: createPassword(),
			}),
			r({
				username: 'walker',
				displayName: 'Walker',
				email: 'walker@codetype.com',
				location: 'Little Rock, AR',
				imageUrl: '',
				online: false,
				hashedPassword: createPassword(),
			}),
			r({
				username: 'peta',
				displayName: 'Peta Typer',
				email: 'peta@codetype.com',
				location: '',
				imageUrl: '',
				online: false,
				hashedPassword: createPassword(),
			}),
			r({
				username: 'john',
				displayName: 'John Typer',
				email: 'john@codetype.com',
				location: 'Not Avaliable',
				imageUrl: '',
				online: false,
				hashedPassword: createPassword(),
			}),
			r({
				username: 'laura',
				displayName: 'Laura Typer',
				email: 'laura@codetype.com',
				location: 'Not Avaliable',
				imageUrl: '',
				online: false,
				hashedPassword: createPassword(),
			}),
			r({
				username: 'bergliot',
				displayName: 'Bergliot Typer',
				email: 'bergliot@codetype.com',
				location: 'Not Avaliable',
				imageUrl: '',
				online: false,
				hashedPassword: createPassword(),
			}),
			r({
				username: 'radomil',
				displayName: 'Radomil Typer',
				email: 'radomil@codetype.com',
				location: 'Not Avaliable',
				imageUrl: '',
				online: false,
				hashedPassword: createPassword(),
			}),
			r({
				username: 'valerie',
				displayName: 'Valerie Typer',
				email: 'valerie@codetype.com',
				location: 'Not Avaliable',
				imageUrl: '',
				online: false,
				hashedPassword: createPassword(),
			}),
			r({
				username: 'yveta',
				displayName: 'Yveta Typer',
				email: 'yveta@codetype.com',
				location: 'Not Avaliable',
				imageUrl: '',
				online: false,
				hashedPassword: createPassword(),
			}),
			r({
				username: 'viola',
				displayName: 'Viola Typer',
				email: 'viola@codetype.com',
				location: 'Not Avaliable',
				imageUrl: '',
				online: false,
				hashedPassword: createPassword(),
			}),
			r({
				username: 'alex',
				displayName: 'Alex Typer',
				email: 'alex@codetype.com',
				location: 'Not Avaliable',
				imageUrl: '',
				online: false,
				hashedPassword: createPassword(),
			}),
			r({
				username: 'ivan',
				displayName: 'Ivan Typer',
				email: 'ivan@codetype.com',
				location: 'Not Avaliable',
				imageUrl: '',
				online: false,
				hashedPassword: createPassword(),
			}),
		]);
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('Users', null, {
			truncate: true,
			cascade: true,
			restartIdentity: true,
		});
	},
};
