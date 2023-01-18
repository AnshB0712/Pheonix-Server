const dotenv = require('dotenv');
const path = require('path');

dotenv.config({
    path: path.resolve(__dirname, `./${process.env.NODE_ENV}.env`)
});

module.exports = {
    NODE_ENV: process.env.NODE_ENV || 'development',
    MONGO_URI : process.env.MONGO_URI,
    ACCESS_TOKEN_SECRET : process.env.ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET : process.env.REFRESH_TOKEN_SECRET,
    ACCESS_TOKEN_EXP : process.env.ACCESS_TOKEN_EXP,
    REFRESH_TOKEN_EXP : process.env.REFRESH_TOKEN_EXP,
    APP_ID : process.env.APP_ID,
    APP_SECRET : process.env.APP_SECRET,
    PAYTM_M_KEY : process.env.PAYTM_M_KEY,
    PAYTM_M_ID : process.env.PAYTM_M_ID,
    FRONTEND_URL : process.env.FRONTEND_URL,
    BACKEND_URL : process.env.BACKEND_URL
}