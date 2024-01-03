const mongoose = require("mongoose")

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log(`Mongodb connected ${mongoose.connection.host}`)
    } catch (error) {
        console.log(`MongoDB Server issue - ${error}`)
    }
}

module.exports = connectDB;