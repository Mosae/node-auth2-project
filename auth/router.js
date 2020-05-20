const bcryptjs = require('bcryptjs');
const router = require('express').Router();

const Users = require('../users/users-model.js');
const { isValid } = require('../users/user-service.js');

router.post('/register', (req, res) => {
	const credentials = req.body;
	if (isValid(credentials)) {
		const rounds = process.env.BCRYPT_ROUNDS || 8;
		// hash the password
		const hash = bcryptjs.hashSync(credentials.password, rounds);

		credentials.password = hash;
		//save the user to the database
		Users.add(credentials)
			.then((user) => {
				req.session.loggedIn === true;
				res.status(201).json({ data: user });
			})
			.catch((error) => {
				res.status(500).json({ message: error.message });
			});
	} else {
		res.status(400).json({
			message:
				'Please provide username and password & password should be string',
		});
	}
});

router.post('/login', (req, res) => {
	const { username, password } = req.body; //separate username and password
	if (isValid(req.body)) {
		Users.findBy({ username: username }) //search for the user by username
			.then(([user]) => {
				// compare the password the hash stored in the database
				if (user && bcryptjs.compareSync(password, user.password)) {
					//compare the database hashed password and the user password
					//we can save info about the client inside the session (req.session)
					req.session.loggedIn = true;
					req.session.user = user;
					res.status(200).json({ message: 'You are logged in' });
				} else {
					res.status(401).json({ message: 'Invalid credentials' });
				}
			})
			.catch((error) => {
				res.status(500).json({ message: error.message });
			});
	} else {
		res.status(400).json({
			message:
				'Please provide username and password & password should be string',
		});
	}
});

router.get('/logout', (req, res) => {
	if (req.session) {
		req.session.destroy((error) => {
			if (error) {
				res.status(500).json({
					message: 'There was an error loggin you our, please try again',
				});
			} else {
				res.status(204).end();
			}
		});
	} else {
		res.status(204).end();
	}
});

module.exports = router;
