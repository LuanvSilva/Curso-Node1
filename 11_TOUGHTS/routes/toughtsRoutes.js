const express = require('express')
const router = express.Router()
const ToughtsController = require('../controllers/ToughtsController')
const checkAuth = require('../helpers/auth').checkAuth

router.get('/add',checkAuth, ToughtsController.createTought)
router.post('/add',checkAuth, ToughtsController.createToughtSave)
router.get('/dashbord',checkAuth, ToughtsController.dashboard)
router.get('/', ToughtsController.showToughts)

module.exports = router