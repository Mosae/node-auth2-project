const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const session = require('express-session');

const usersRouter = require('../users/users-router.js');
const authRouter = require('../auth/router.js');

const server = express();
const sessionConfig = {
	cookie: {
		maxAge: 1000 * 60 * 60, //1 hour is milliseconds
		secure: process.env.SCURE_COOKIE || false, //send the cookie only over https, true in production
		httpOnly: true, //true means client (JS) cannot access the cookie
	},
	resave: false,
	saveUninitialized: process.env.USER_ALLOWED_COOKIES || true,
	name: 'golf', //name of the cookie
	secret: process.env.COOKIE_SECRET || 'Our secret',
};
//create a session and send a cookie back(the cookie will store session id)
server.use(session(sessionConfig)); //turn on session for the api

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use('/api/users', usersRouter);
server.use('/api/auth', authRouter);

server.get('/', (req, res) => {
	res.send('Server is up and running');
});

module.exports = server;
