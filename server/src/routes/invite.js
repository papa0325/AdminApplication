const express = require('express')
const router = express.Router()

const inviteController = require('../controllers/invite')

router.post('/', 
    inviteController.validate("teammember"),
    inviteController.invite)
router.get('/confirm/', inviteController.confirm)
router.get('/decline/:token',inviteController.decline)
module.exports = router;