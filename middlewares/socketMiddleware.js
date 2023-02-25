const JWT = require('jsonwebtoken');
const { BadRequestError } = require('../errors');
const { ACCESS_TOKEN_SECRET } = require('../variables');

const socketMiddleware = (socket, next) => {
    const token = socket.handshake.auth.token;
    console.log(token)
    try {
        let decoded = JWT.verify(token,ACCESS_TOKEN_SECRET);
        console.log(decoded)
        next()
    } catch (error) {
        next(new Error('Token is not present, cannot connect to the socket.'))
  }

}

module.exports = socketMiddleware