require('express-async-errors');
const { FRONTEND_URL, DASHBOARD_URL } = require('./variables');
const express = require('express');
const app = express()
const cookieParser = require('cookie-parser');

const { createServer } = require("http");
// const { Server: ServerFromSocketIO } = require("socket.io");

const httpServer = createServer(app);
// const io = new ServerFromSocketIO(httpServer);

const publicRouter = require("./routes/public");
// const authRouter = require('./routes/auth');
// const adminRouter = require("./routes/admin");
// const userRouter = require("./routes/user");
// const sharedRouter = require("./routes/shared");
// const paymentRouter = require("./routes/payment");

// const isUserANormalUser = require("./middlewares/isUserANormalUser");
// const isUserAdmin = require("./middlewares/isUserAdmin");
// const socketMiddleware = require("./middlewares/socketMiddleware");
// const verifyJWT = require("./middlewares/verifyJWT");
const errorHandler = require("./middlewares/errorHandler");

const start = require('./config/start');

// const {getAllTodaysOrdersViaSocket} = require("./controllers/admin/getAllTodaysOrdersViaSocket");
// const paymentStatusController = require("./controllers/payment/paymentStatusController");


// app.use(require('cors')({
//   origin: [FRONTEND_URL,DASHBOARD_URL],
//   credentials: true
// }))


//---- INITIALIZE THE SOCKET CONNNECTION ----//
// io.of('admin/todays-orders')
// .use((socket, next) => socketMiddleware(socket,next))
// .on("connection", (socket) => {
//   console.log('Socket connected to admin/todays-orders')
//   getAllTodaysOrdersViaSocket(socket)
// });


app.use(require('cors')({
  origin: [FRONTEND_URL,DASHBOARD_URL,'http://localhost:5000'],
  credentials: true
}))

// TO INSPECT THE REQUEST FOR DEVELOPMENT PURPOSE
app.use((req,res) => console.log({
  type: req.method,
  path: req.path,
}))


app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cookieParser())


// ROUTES //

//---- ONLY PUBLIC USER CAN ACCESS THIS ROUTER'S ----//
app.use('/',publicRouter)

//---- SOME ROUTES THAT ARE SHARED BY DIFF. ROLES USERS ----//
// app.use("/shared",sharedRouter)

//---- AUTH PROCESS IN THIS ROUTER ----//
// app.use('/auth',authRouter)

//---- PAYMENT PROCESS STATUS ----//
// app.post('/payment/paytm-status',paymentStatusController)

//---- ONLY AUTHENTICATE USER CAN ACCESS THE FURTHER ROUTER'S ----//
// app.use(verifyJWT)

//---- PAYMENT SERVICE RELATED ROUTER ----//
// app.use('/payment',paymentRouter)

//---- ONLY ADMIN USER CAN ACCESS THE ADMIN ROUTER ----//
// app.use('/admin',isUserAdmin,adminRouter)

//---- ONLY NORMAL USER CAN ACCESS THIS ROUTER ----//
// app.use("/user",isUserANormalUser,userRouter)

// ERROR HANDLER //
app.use(errorHandler)


// Start Application at Port 3000 //
start(httpServer,5000)
