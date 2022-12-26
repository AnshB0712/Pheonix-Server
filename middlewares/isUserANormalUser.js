const { UnAuthorizedError } = require("../errors")

const isUserANormalUser = (req,res,next) => {
    if(req.user.role === 2000)
    throw new UnAuthorizedError("You are not authorized to access this route!")

    next()
}

module.exports = isUserANormalUser