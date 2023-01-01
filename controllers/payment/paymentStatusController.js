const paymentStatusController = (req,res) => {
    const response = req.body
    console.log(response)
    res.redirect(301,'http://localhost:5173/')
}

module.exports = paymentStatusController