const express = require('express');
const whatsAppLogin = require('../../controllers/auth/whatsAppLogin');
const authRouter = express.Router()

authRouter.post('/whatsapp-login',whatsAppLogin)

module.exports = authRouter