const { mongoose } = require("mongoose")

const start = async (app,port) => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        app.listen(port,() => console.log('app is listening in port '+port))
    } catch (e) {
        console.log(e)
    }
}

module.exports = start