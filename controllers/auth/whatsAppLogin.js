const axios = require('axios');
const User = require('../../models/User');
const JWT = require('jsonwebtoken');
const { APP_ID, APP_SECRET, ACCESS_TOKEN_SECRET, ACCESS_TOKEN_EXP, REFRESH_TOKEN_SECRET, REFRESH_TOKEN_EXP } = require('../../variables');

const whatsAppLogin = async (req,res) => {
  const {token ,state} = req.body;
  console.log({token ,state})
  const {data:{data:{name,mobile}}} = await axios.post('https://api.otpless.app/v1/client/user/session/userdata',{token,state},{
    headers:{
        'content-type': 'application/json',
        'appId': APP_ID,
        'appSecret': APP_SECRET,
    }
  })
  const user = {
    name,
    mobile: mobile.slice(2)
  }

  const userAlreadyExists = await User.findOne({mobile:user.mobile})

  if(userAlreadyExists){

    const ACCESS_TOKEN = JWT.sign({
      role: userAlreadyExists.role,
      mobile: userAlreadyExists.mobile
    },ACCESS_TOKEN_SECRET,{expiresIn:ACCESS_TOKEN_EXP})

    const REFRESH_TOKEN = JWT.sign({
      role: userAlreadyExists.role,
      mobile: userAlreadyExists.mobile
    },REFRESH_TOKEN_SECRET,{expiresIn:REFRESH_TOKEN_EXP})

    res.cookie('refresh',REFRESH_TOKEN, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 })
    res.status(200).json({...user,id:userAlreadyExists._id,token:ACCESS_TOKEN})  }

  if(!userAlreadyExists){
    const newUser = await User.create({...user})

    const ACCESS_TOKEN = JWT.sign({
      role: newUser.role,
      mobile: newUser.mobile
    },ACCESS_TOKEN_SECRET,{expiresIn:ACCESS_TOKEN_EXP})

    const REFRESH_TOKEN = JWT.sign({
      role: newUser.role,
      mobile: newUser.mobile
    },REFRESH_TOKEN_SECRET,{expiresIn:REFRESH_TOKEN_EXP})

    newUser.refreshToken = REFRESH_TOKEN
    await newUser.save()

    res.cookie('refresh',REFRESH_TOKEN, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 })
    res.status(200).json({...user,id:newUser._id,token:ACCESS_TOKEN})
  }
 }

module.exports = whatsAppLogin
