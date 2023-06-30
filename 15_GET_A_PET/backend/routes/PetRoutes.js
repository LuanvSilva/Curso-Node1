const router = require('express').Router()
const PetController = require('../controllers/PetController')

//middlewares
const veryfyToken = require('../helpers/verify-token')


router.post('/create', veryfyToken, PetController.create)

module.exports = router