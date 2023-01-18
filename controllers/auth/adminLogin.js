const { BadRequestError, UnAuthorizedError } = require("../../errors")
const JWT = require('jsonwebtoken');
const Adminuser = require("../../models/AdminUsers")

const adminLogin = async (req,res) => {
    const { username,password} = req.body

    if(!username || !password){
        throw new BadRequestError('username and password are required.')
    }

    const [Admin] = await Adminuser.find({username})

    if(!Admin){
        throw new UnAuthorizedError('No admin registered with this username')
    }

    if(Admin.password !== password){
        throw new BadRequestError('Password is incorrect.')
    }

    const ACCESS_TOKEN = JWT.sign({
        role: Admin.role,
        username: Admin.username
      },process.env.ACCESS_TOKEN_SECRET,{expiresIn:process.env.ACCESS_TOKEN_EXP})
  
      const REFRESH_TOKEN = JWT.sign({
        role: Admin.role,
        username: Admin.username
      },process.env.REFRESH_TOKEN_SECRET,{expiresIn:process.env.REFRESH_TOKEN_EXP})
  
      res.cookie('refresh',REFRESH_TOKEN, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 })

      res.json({
        message: 'login successfull.',
        token: ACCESS_TOKEN 
    })

}


module.exports = adminLogin