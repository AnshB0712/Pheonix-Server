const JWT = require('jsonwebtoken');
const { BadRequestError } = require('../errors');
const { ACCESS_TOKEN_SECRET } = require('../variables');

const socketMiddleware = (socket, next) => {
    const token = socket.handshake.auth.token;
    try {
        let decoded = JWT.verify(token,ACCESS_TOKEN_SECRET);
        next()
    } catch (error) {
        next(new Error('Token is not present, cannot connect to the socket.'))
  }

}

module.exports = socketMiddleware