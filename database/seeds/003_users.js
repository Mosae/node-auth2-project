exports.seed = function (knex) {
	// 000-cleanup.js already cleaned out all tables

	const users = [
		{
			username: 'groot',
			password: 'Iamgroot!',
			department: 'services',
			role: 1,
		},
		{
			username: 'admin',
			password: 'keepitsecret,keepitsafe.',
			department: 'sports',
			role: 1,
		},
		{
			username: 'me',
			password: 'changethepass',
			department: 'agriculture',
			role: 2,
		},
		{
			username: 'nobody',
			password: 'hasnorole',
			department: 'education',
		},
		{
			username: 'notme',
			password: 'hasnorole',
			department: 'farms',
		},
	];

	return knex('users').insert(users);
};
