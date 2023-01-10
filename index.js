require("dotenv").config()
require('express-async-errors');
const express = require('express');
const app = express()
const cookieParser = require('cookie-parser');

const { createServer } = require("http");
const { Server } = require("socket.io");

const httpServer = createServer(app);
const io = new Server(httpServer, {  
    cors: {
        origin: ['http://localhost:5173'],
        credentials: true
      }
});

io.of('admin/todays-orders').on("connection", (socket) => {
  console.log('Socket connected to admin/todays-orders')
  getAllTodaysOrders(socket)
});

const authRouter = require('./routes/auth');
const adminRouter = require("./routes/admin");
const userRouter = require("./routes/user");
const sharedRouter = require("./routes/shared");
const paymentRouter = require("./routes/payment");

// const isUserANormalUser = require("./middlewares/isUserANormalUser");
// const isUserAdmin = require("./middlewares/isUserAdmin");
// const verifyJWT = require("./middlewares/verifyJWT");
const errorHandler = require("./middlewares/errorHandler");

const start = require('./config/start');
const getAllDishes = require("./controllers/public/getAllDishes");
const renewToken = require("./controllers/public/renewToken");
const getDishFromId = require("./controllers/public/getDishFromId");
const { logger } = require("./middlewares/logger");
const getAllTodaysOrders = require("./controllers/admin/getAllTodaysOrders");

app.use(logger)

app.use(require('cors')({
    origin:['http://localhost:5173'], 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}))

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cookieParser())

// ONLY PUBLIC ROUTES FOR THE WHOLE SERVER //
app.use("/shared",sharedRouter)
app.get('/',getAllDishes)
app.get('/get-dish-from-id',getDishFromId)
app.get('/renew',renewToken)

// ROUTES //
app.use('/auth',authRouter)

//---- ONLY AUTHENTICATE USER CAN ACCESS THE FURTHER ROUTER'S ----//
// app.use(verifyJWT)
app.use('/payment',paymentRouter)
// app.get("/test",(req,res) => {res.json({message:"test"})})

//---- ONLY ADMIN USER CAN ACCESS THE ADMIN ROUTER ----//
app.use('/admin',adminRouter)

//---- ONLY NORMAL USER CAN ACCESS THIS ROUTER ----//
app.use("/user",userRouter)

//---- ONLY LOGGED IN USER CAN ACCESS THIS ROUTER ----//

// ERROR HANDLER //
app.use(errorHandler)


// Start Application at Port 8080 //
start(httpServer,3000)