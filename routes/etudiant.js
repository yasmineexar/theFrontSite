const router = require('express').Router()
const { read, find } = require('../controllers/EtudiantController')


router.get('/', read)
router.post('/', find)
router.get('/:id', read)

module.exports = router