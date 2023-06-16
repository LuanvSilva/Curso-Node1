const express = require('express')
const router = express.Router
const ToughtsCotroller = require('../controllers/ToughtsCotroller')

router.get('/', ToughtsCotroller.showToughts)

module.exports = router