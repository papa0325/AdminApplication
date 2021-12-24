const mongoose = require("mongoose")

const teamSchema = new mongoose.Schema({
    teamname: {
        type: String,
        unique: true
    },
    teamsrc : {
        type: String,
        default: ''
    },
    teamadmin: {
        type: String,
        required: true
    },
    teammember : [
        {
            email: {
                type: String,
            },
            accessKey: {
                type: String,
            },
            confirmed :{
                type: Boolean,
                default: false
            }
        }
    ]
})
module.exports = mongoose.model('team', teamSchema)