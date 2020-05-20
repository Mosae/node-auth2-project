const router = require('express').Router();

const Users = require('./users-model.js');
const restricted = require('../auth/restricted-middleware');
//This will restrict a user thats not logged in from accessing information
// function restricted(req, res, next) {
// 	if (req.session && req.session.loggedIn) {
// 		next();
// 	} else {
// 		res.status(401).json({ message: 'You need to be logged in' });
// 	}
// }

//This will restrict a user thats not logged in from accessing information globally within this router
router.use(restricted);

router.get('/', (req, res) => {
	Users.find()
		.then((users) => {
			res.json({ users, jwt: req.jwt });
		})
		.catch((err) => {
			res.send(err);
		});
});

module.exports = router;
