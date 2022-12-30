const https = require('https');

const paymentProcess = (req,res) => {

    const {orderId,txnToken} = req.body

var paytmParams = {};

paytmParams.body = {
    "requestType" : "NATIVE",
    "mid"         : process.env.PAYTM_M_ID,
    "orderId"     : orderId,
    "paymentMode" : "UPI_INTENT",
};

paytmParams.head = {
    "txnToken"    : txnToken
};

var post_data = JSON.stringify(paytmParams);

var options = {

    /* for Staging */
    hostname: 'securegw-stage.paytm.in',

    /* for Production */
    // hostname: 'securegw.paytm.in',

    port: 443,
    path: `/theia/api/v1/processTransaction?mid=${process.env.PAYTM_M_ID}&orderId=${orderId}`,
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
        res.json({response: JSON.parse(response)})
    });
}); 
post_req.write(post_data);
post_req.end();        


}

module.exports = paymentProcess