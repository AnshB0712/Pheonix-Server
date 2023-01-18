const { UnAuthorizedError, BadRequestError, ForbiddenError } = require("../../errors")
const JWT = require('jsonwebtoken');
const User = require("../../models/User");
const AdminUsers = require("../../models/AdminUsers");

const renewToken = async (req,res) => {
    const {refresh} = req.cookies
    let decode;
    let targetUser;
    let ACCESS_TOKEN;
    
    if(!refresh){
        throw new UnAuthorizedError("No Token Found, Please Login/SignUp Again.")
    }
    
    JWT.verify(refresh,process.env.REFRESH_TOKEN_SECRET,function(err,decodedToken){
        if(err)
            throw ForbiddenError('Token is expired')
            
        decode = decodedToken;
    })

    if(decode.role === 2004){
        targetUser = await User.findOne({mobile: decode.mobile})
        ACCESS_TOKEN = JWT.sign({
            role: targetUser.role,
            mobile: targetUser.mobile
        },process.env.ACCESS_TOKEN_SECRET,{expiresIn:process.env.ACCESS_TOKEN_EXP})

    }

    if(decode.role === 2000){
        targetUser = await AdminUsers.findOne({username: decode.username})
        ACCESS_TOKEN = JWT.sign({
            role: targetUser.role,
            mobile: targetUser.username
        },process.env.ACCESS_TOKEN_SECRET,{expiresIn:process.env.ACCESS_TOKEN_EXP})
    }

    if(!targetUser){
        throw new BadRequestError("No User Found, Please Login/SignUp Again.")
    }
    
        res.status(200).json({message: "New Token Generated!",token:ACCESS_TOKEN})


}

module.exports = renewToken