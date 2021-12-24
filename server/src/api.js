const express = require("express")
const serverless = require("serverless-http")
const cors = require('cors')
const app = express()
const teamRouter = require('./routes/team')
const inviteRouter = require('./routes/invite')
const connectDB = require('./config/db')

const baseUrl = '/.netlify/functions/api'

const fun = async () =>{
    await connectDB()
}

fun()
app.use(cors())

app.use(`${baseUrl}/team`,teamRouter)
app.use(`${baseUrl}/invite`, inviteRouter)
module.exports.handler = serverless(app);