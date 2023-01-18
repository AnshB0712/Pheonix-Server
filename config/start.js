const { mongoose } = require("mongoose")
const { MONGO_URI } = require("../variables")

const start = async (app,port) => {
    try {
        await mongoose.connect(MONGO_URI)
        app.listen(port,() => console.log('app is listening in port '+port))
    } catch (e) {
        console.log(e)
    }
}

module.exports = start