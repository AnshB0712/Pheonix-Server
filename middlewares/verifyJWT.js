const JWT = require('jsonwebtoken');
const { BadRequestError } = require('../errors');

const verifyJWT = async (req,res,next) => {
    const token = req.headers?.authorization?.split(' ')[1]
    const { refresh } = req.cookies

    if(!token && !refresh)
    throw new BadRequestError("Token is not present or compromised, Please login/signup!")

    const decode = await JWT.verify(token || refresh ,process.env.ACCESS_TOKEN_SECRET)
    req.user = {...decode}
    next()
}

module.exports = verifyJWT