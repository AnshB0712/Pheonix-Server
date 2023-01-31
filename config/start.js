const { mongoose } = require("mongoose")
const { MONGO_URI } = require("../variables")
const {connectToQueue} = require("./connectToQueue")

const start = async (app,port) => {
    try {
        await connectToQueue();
        console.log('-------Rabbit-MQ connected-------')
        await mongoose.connect(MONGO_URI)
        console.log('-------MONGO-DB connected-------')
        app.listen(port,() => console.log('App is listening at port '+port))
    } catch (e) {
    }
}

module.exports = start