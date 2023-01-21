const https = require('https');
const { PAYTM_M_KEY, PAYTM_M_ID, BACKEND_URL } = require('../../variables');
const PaytmChecksum = require('./PaytmChecksum');

const paymentController = (req,res) => {
  const {orderId,userId,amount} = req.body
  var paytmParams = {};

paytmParams.body = {
    "requestType"   : "Payment",
    "mid"           : PAYTM_M_ID,
    "websiteName"   : "WEBSTAGING",
    "orderId"       : orderId,
    "callbackUrl"   : `${BACKEND_URL}/payment/paytm-status`,
    "txnAmount"     : {
        "value"     : ""+amount,
        "currency"  : "INR",
    },
    "userInfo"      : {
        "custId"    : userId,
    },
};

/*
* Generate checksum by parameters we have in body
* Find your Merchant Key in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys 
*/
PaytmChecksum.generateSignature(JSON.stringify(paytmParams.body), PAYTM_M_KEY).then(function(checksum){

    paytmParams.head = {
        "signature"    : checksum
    };

    var post_data = JSON.stringify(paytmParams);

    var options = {

        /* for Staging */
        hostname: 'securegw-stage.paytm.in',

        /* for Production */
        // hostname: 'securegw.paytm.in',

        port: 443,
        path: `/theia/api/v1/initiateTransaction?mid=${PAYTM_M_ID}&orderId=${orderId}`,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': post_data.length
        }
    };

    var response = "";
    var post_req = https.request(options, function(post_res) {
        post_res.on('data', function (chunk) {
            response += chunk;
        });

        post_res.on('end', function(){
            try {
              const serverResponse = JSON.parse(response)
              res.json({response: serverResponse})
            } catch (error) {
              strippedResponse = response.replace(/<[^>]+>/g, '');
              console.log(strippedResponse)
              res.status(500).send(strippedResponse)
            }
        });
    });

    post_req.write(post_data);
    post_req.end();
});

}

module.exports = paymentController
