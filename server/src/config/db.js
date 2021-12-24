require("dotenv").config()

const mongoose = require("mongoose")

const url = process.env.MONGODB_URL

const connectDB = async () => {
    console.log("db connecting...");
    try {
        await mongoose.connect(
            url, 
            { 
                useNewUrlParser: true, 
                useUnifiedTopology: true, 
                useCreateIndex: true, 
                useFindAndModify: true
        })
        console.log('Connected to MongoDB')
    } catch (err) {
        console.log("db connection error: " + err);
        process.exit(1)        
    }
}

module.exports = connectDB
