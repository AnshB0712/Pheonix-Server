const { UnAuthorizedError, BadRequestError } = require("../../errors")
const JWT = require('jsonwebtoken');
const User = require("../../models/User");

const renewToken = async (req,res) => {
    const {refresh} = req.cookies
    if(!refresh){
        throw new UnAuthorizedError("No Token Found, Please Login/SignUp Again.")
    }

    const {role,mobile} = await JWT.verify(refresh,process.env.REFRESH_TOKEN_SECRET)

    const targetUser = await User.find({mobile})

    if(!targetUser){
        throw new BadRequestError("No User Found, Please Login/SignUp Again.")
    }

    const ACCESS_TOKEN = JWT.sign({
        role: targetUser.role,
        mobile: targetUser.mobile
    },process.env.ACCESS_TOKEN_SECRET,{expiresIn:process.env.ACCESS_TOKEN_EXP})

    res.status(200).json({message: "New Token Generated!",token:ACCESS_TOKEN})

}

module.exports = renewToken