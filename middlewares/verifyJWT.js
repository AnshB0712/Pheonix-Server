const JWT = require('jsonwebtoken');
const { ForbiddenError, UnAuthorizedError } = require('../errors');
const { ACCESS_TOKEN_SECRET } = require('../variables');

const verifyJWT = (req,_,next) => {
    const token = req.headers?.authorization?.split(' ')[1]
    if(!token)
    throw new UnAuthorizedError("Token is not present, Please login/signup!")

    JWT.verify(token,ACCESS_TOKEN_SECRET,(err, decoded) => {
        if(err) {
            throw new ForbiddenError("Token is Expired.")
        }
        req.user = {...decoded}
        next()
    })
}

module.exports = verifyJWT