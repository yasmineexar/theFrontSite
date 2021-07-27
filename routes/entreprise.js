const router = require('express').Router()
const { index } = require('../controllers/entreprises')


router.get('/', index)



module.exports = router