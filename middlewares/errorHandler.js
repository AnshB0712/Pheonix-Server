const { CustomAPIError } = require("../errors")
const {StatusCodes} = require('http-status-codes');

const errorHandler = (err,req,res,next) => {
    console.log(err)

    if(err instanceof CustomAPIError)
    return res.status(err.statusCode).json({message: err.message})
    
    if(err.name === "ValidationError")
    return res.status(400).json({message: err.message})

    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: "Something went wrong!"})
}

module.exports = errorHandler