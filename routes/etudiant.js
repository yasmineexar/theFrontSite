const router = require('express').Router()
const { add, read } = require('../controllers/etudiants')


router.get('/', read)
router.get('/:id', read)

module.exports = router