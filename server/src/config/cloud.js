const Cloud = require('@google-cloud/storage')
const path = require('path')
const projectId = process.env.projectId
const serviceKey = path.join(__dirname, './keys.json')

// Google Cloud Authorization
const { Storage } = Cloud
const storage = new Storage({
    keyFilename: serviceKey,
    projectId: projectId,
})

module.exports = storage