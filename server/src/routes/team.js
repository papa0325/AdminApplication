const express = require('express')
const router = express.Router()

const teamController = require('../controllers/team')

router.post('/create', teamController.create)
router.post('/update', teamController.update)
router.post('/get', teamController.get)
router.get('/getbyname', teamController.getbyname)
module.exports = router;