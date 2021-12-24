const uploadImage = require('./helpers')
const bucketName = process.env.BUCKETNAME

const upload = async (req, res, next) => {
    try {
        const myFile = req.file
        const imageUrl = await uploadImage(myFile)
        res
          .status(200)
          .json({
            message: "Upload was successful",
            data: imageUrl
          })
    } catch (error) {
        next(error)
    }
}
module.exports = {upload}