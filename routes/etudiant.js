const router = require('express').Router()
const { add, read } = require('../controllers/EtudiantController')


router.get('/', read)
router.get('/:id', read)

module.exports = router