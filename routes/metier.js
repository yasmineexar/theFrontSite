const router = require("express").Router()
const { creat, edit, add, read, update, delet } = require("../Controllers/MetierController")

router.get('/add', add)
router.post('/add', creat)
router.get('/', read)
router.get('/:id', read)
router.post('/:id', update)
router.get('/edit/:id', edit)
router.delete('/:id', delet)

module.exports = router