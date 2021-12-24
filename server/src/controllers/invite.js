require("dotenv").config()
const { body, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const Team = require('../models/team')
const jwt = require('jsonwebtoken')

const content = require('./content')
const sendEmail = require('./sendEmail')
const frontUrl = process.env.FRONT_URL

// Validate email format
const validate = (method) => {
    switch (method) {
        case 'teammember':
            return [
                body('email', 'Please provide a valid email').exists().isEmail()
            ]
    }
}

// Send invitation by email
const invite = async (req, res) => {
    let request = req.body.toString();
    const { adminEmail, inviteEmail } = JSON.parse(request)
    
    // Check email format
    const errors = validationResult(inviteEmail)
    if (!errors.isEmpty()) {
        return res.status(200).json({ 
            msg: "Invalid Email Address" 
        })
    }
    let member = await Team.findOne({
        "teamadmin":adminEmail
    }, function (err, result) {
        if (err) {
            console.log(err)
            res.status(500).send("Server Error")
            return null
        }
    })
    if (!member) 
        return res.status(200).send("Invitation Failed")
    try {
        let teammember = await Team.findOne({
            "teamadmin":adminEmail,
            "teammember.email": inviteEmail 
        }
        , function (err, result) {
            if (err) {
                console.log(err)
                return null
            }
            return result
        })
        let msg = ""
        if (teammember && 
            teammember.teamadmin !== inviteEmail) {
            if (teammember.teammember.confirmed) 
                msg = "This is a member already"
            else 
                msg = "This member already has been invited already"
            return res.status(200).json({ msg: msg })
        }
        // Encode accessKey using hash function
        let accessKey = await String(Math.floor(100000000000 + Math.random() * 900000000000))
        const salt = await bcrypt.genSalt(10)
        let key = await bcrypt.hash(accessKey, salt)
        let team = await Team.findOne({ 
            "teamadmin": adminEmail
        }, function(err, result) {
            if (err) {
                console.log(err.message)
                return null
            }
            return result
        })
        
        if (team){
            team.teammember.push({
                "email":inviteEmail,
                "accessKey":key
            })
            team.save()
        }
        const payload = {
            accessKey: key
        }
        
        jwt.sign(payload, process.env.SECRET, {
            expiresIn: 3600
        }, async (err, token) => {
            if (err) throw err

            // Send invitation email to member
            let sendResult = await sendEmail(inviteEmail, adminEmail, content(token))
            if (sendResult === "success") 
                res.status(200).json({msg: 'Invitation successfully' })
            else res.status(200).json({msg:'Invitation failed'})
        })
    } catch (err) {
        res.status(500).json({
            msg:'Server Error'
        })
    }
}

// Check if invitation request is right using token
const confirm = async (req, res) => {
    const token = req.query.token
    let decoded;
    jwt.verify(token, process.env.SECRET, (err, dec) => {
        if (err) {
            res.status(200).json({
                msg:'Unauthorized invitation'
            })
        }
        
        decoded = dec.accessKey
    })
    let member = await Team.findOne({
        "teammember": { 
            $elemMatch: {
                "accessKey": decoded 
            }
        }
    },function (err, result) {
            if (err) {
                console.log(err.message)
                return null
            }
            return result
        }
    )
    if (!member) {
        res.status(200).json({
            msg:"Unauthorized invitation"
        })
    }
    // Change confirm key of Team model to true
    else {
        let mid = await Team.findOne({
            "teammember": 
                { $elemMatch: {
                    "accessKey":decoded, 
                    "confirmed": false
                }},
            function (err, result) {
                if (err) return null
                return result
            }
        })
        if (mid) {
            Team.updateOne({
                "teammember.accessKey":decoded
            },{
                $set: {
                    "teammember.$.confirmed":true
                }
            }).then(() => {
                res.status(200).json({
                    msg:'Confirmed successfully'
                })
                console.log(frontUrl)
                res.redirect(frontUrl)
                // res.writeHead(301,{Location: frontUrl});
                res.end();
            }).catch(err => 
                res.status(500).json({
                    msg:'Server Error'
                })
            )
        }
        else {
            res.writeHead(302, {
                'Location': frontUrl
                //add other headers here...
              });
              res.end();
            // res.redirect(frontUrl)
            res.status(200).json({
            msg:'Invited already'
        })}
    }   
}
    
// Decline invitation
const decline = async (req, res) => {
    try{
        const { token } = req.params
        let decoded;
        jwt.verify(token, process.env.SECRET, (err, dec) => {
            if (err) 
                return res.status(200).json({
                    msg:'Unauthorized invitation'
                })
            decoded = dec.accessKey
        })
        let member = await Team.findOne({
            "teammember.accessKey":decoded
        })

        // Remove declined member from database
        if (!member) {
            res.status(200).json({
                msg:"No such invitation"
            })
        }
        else {
            Team.update(
                {},
                {
                    $pull: {
                        "teammember": { "accessKey" : decoded }
                    }
                }
            )
            .then(() => res.status(200).json({
                msg:"Declined"
            }))
            .catch(err => res.status(500).json({
                msg:'Server Error'
            }))
        }
    } catch (err) {
        res.status(500).json({
            msg:'Server Error'
        })
    }
}
module.exports = { validate, invite,confirm, decline }