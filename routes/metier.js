
const router = require("express").Router()
const { create, add, read, update, delet } = require("../Controllers/MetierController")


router.get('/', read)
router.get('/add', add)
router.get('/:id', read)
router.post('/', create)
router.post('/:id', update)
router.delete('/:id', delet)

module.exports = router




