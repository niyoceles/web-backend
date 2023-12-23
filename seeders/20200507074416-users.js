export const up = (queryInterface, Sequelize) =>
	queryInterface.bulkInsert(
		'users',
		[
			{
				id: 'db7b7393-e136-4727-bd22-1ef307244de9',
				email: 'superclient@gmail.com',
                firstName: 'Super',
				lastName: 'Client',
				phoneNumber: '+250783067000',
                firstName: 'Celestin',
				lastName: 'Niyonsaba',
				// password "Abcd123@dom"
				password:
					'$2a$10$S8OdwP6ck6aSguzg/XAhOe.YSqAYigGS8An0BMiCu2J/vFwgoRrK.',
				role: 'client',
				isActive: true,
				createdAt: '2020-05-07 09:37:12.509+02',
				updatedAt: '2020-05-08 09:37:12.509+02',
			},
			{
				id: 'db7b7393-e138-4727-bd22-1ef307244de9',
				email: 'supplier@gmail.com',
                firstName: 'Celestin2',
				lastName: 'Niyonsaba2',
				phoneNumber: '+250788550184',
				// password "Abcd123@dom"
				password:
					'$2a$10$S8OdwP6ck6aSguzg/XAhOe.YSqAYigGS8An0BMiCu2J/vFwgoRrK.',
				organization: 'CAR GUYZ',
				role: 'supplier',
				isActive: true,
				createdAt: '2020-05-07 09:37:12.509+02',
				updatedAt: '2020-05-08 09:37:12.509+02',
			},
			{
				id: 'db7b7393-e138-4727-bd44-1ef307244de9',
				email: 'godiscoverafrica20@gmail.com',
                firstName: 'GODISCOVER',
				lastName: 'AFRICA',
				phoneNumber: '+250791349744',
				// password "Abcd123@dom"
				password:
					'$2a$10$S8OdwP6ck6aSguzg/XAhOe.YSqAYigGS8An0BMiCu2J/vFwgoRrK.',
				organization: 'CARS COMMUNITY',
				role: 'admin',
				isActive: true,
				createdAt: '2020-05-07 09:37:12.509+02',
				updatedAt: '2020-05-08 09:37:12.509+02',
			},
		],
		{}
	);
export const down = (queryInterface, Sequelize) =>
	queryInterface.bulkDelete('users', null, {});
