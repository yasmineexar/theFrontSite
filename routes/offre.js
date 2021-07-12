const router = require("express").Router()
const { creat, edit, add, read, update, delet } = require("../Controllers/OffresController")

router.get('/add', add)
router.post('/add', creat)

router.get('/', read)
router.get('/:id', read)

router.get('/edit/:id', edit)
router.post('/:id', update)

router.delete('/:id', delet)

module.exports = router