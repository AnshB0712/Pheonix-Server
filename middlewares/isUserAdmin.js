const { UnAuthorizedError } = require("../errors")

const isUserAdmin = (req,res,next) => {
    if(req.user.role === 2004)
    throw new UnAuthorizedError("You are not authorized to access this route!")

    next()
}

module.exports = isUserAdmin