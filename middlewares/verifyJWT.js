const JWT = require('jsonwebtoken');
const { BadRequestError } = require('../errors');

const verifyJWT = async (req,res,next) => {
    const token = req.headers?.authorization?.split(' ')[1]

    if(!token)
    throw new BadRequestError("Token is not present or compromised, Please login/signup!")

    const decode = await JWT.verify(token,process.env.ACCESS_TOKEN_SECRET)
    req.user = {...decode}
    next()
}

module.exports = verifyJWT