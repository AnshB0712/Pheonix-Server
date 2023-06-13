const JWT = require('jsonwebtoken');
const {ACCESS_TOKEN_SECRET} = require('../variables');

const socketMiddleware = (socket, next) => {
	const {token} = socket.handshake.auth;
	console.log(token);
	try {
		const decoded = JWT.verify(token, ACCESS_TOKEN_SECRET);
		console.log(decoded);
		next();
	} catch (error) {
		console.log(error, 'SocketMiddleware');
		next(new Error('Token is not present, cannot connect to the socket.'));
	}
};

module.exports = socketMiddleware;
