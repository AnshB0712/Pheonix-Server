const { ForbiddenError } = require("../../errors");
const Order = require("../../models/Order")
const User = require("../../models/User");
const PaytmChecksum = require("./PaytmChecksum");
const JWT = require('jsonwebtoken');
const Transaction = require("../../models/Transaction");
const { PAYTM_M_KEY, FRONTEND_URL, REFRESH_TOKEN_SECRET } = require("../../variables");
const publishToQueue = require("../../queue/producer");

const paymentStatusController = async (req,res) => {

    const {refresh} = req.cookies    
    let mobile;

    if(!refresh){
        throw new UnAuthorizedError("No Token Found, Please Login/SignUp Again.")
    }

    JWT.verify(refresh,REFRESH_TOKEN_SECRET,function(err,decoded){
        if(err)
            throw ForbiddenError('Token is Expired')
        console.log(decoded)
        mobile = decoded.mobile
    })

    const [targetUser] = await User.find({mobile})

    if(!targetUser){
        throw new BadRequestError("No User Found, Please Login/SignUp Again.")
    }

    const {
        STATUS,
        RESPCODE,
        RESPMSG,
        GATEWAYNAME,
        BANKTXNID,
        BANKNAME,
        CHECKSUMHASH,
        CURRENCY,
        TXNDATE,
        TXNAMOUNT,
        PAYMENTMODE,
        ORDERID,
        TXNID,
      } = req.body;

    var paytmChecksum = "";
    var paytmParams = {};
    const receivedData = req.body;
    for (var key in receivedData) {
      if (key == "CHECKSUMHASH") {
        paytmChecksum = receivedData[key];
      } else {
        paytmParams[key] = receivedData[key];
      }
    }
    var isVerifySignature = PaytmChecksum.verifySignature(
      paytmParams,
      PAYTM_M_KEY,
      paytmChecksum
    );
    if (!isVerifySignature) {
      res.status(400).json({ message: "Checksum Mismatched , retry" });
    }

    const today = new Date();
    const data = {
      transactionId: TXNID,
      transactionAmount: TXNAMOUNT,
      currency: CURRENCY,
      gatewayName: GATEWAYNAME,
      bankName: BANKNAME,
      paymentMode: PAYMENTMODE,
      responseCode: RESPCODE,
      responseMessage: RESPMSG,
      orderId: ORDERID,
      orderBy: targetUser._id,
      status: STATUS,
      bankTransactionId: BANKTXNID,
      transactionDate: TXNDATE || today.toISOString(),
    };

    await publishToQueue(data)
    console.log('🚀 Data send to the queue.')

    res.redirect(301,`${FRONTEND_URL}/order/${data.orderId}`)
}

module.exports = paymentStatusController
