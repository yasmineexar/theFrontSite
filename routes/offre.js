const router = require("express").Router()
const { creat, edit, add, read, update, delet } = require("../Controllers/OffresController")

router.get('/add', add)
router.post('/add', creat)

router.get('/edit/:id', edit)
router.post('/edit/:id', update)

router.get('/', read)
router.get('/:id', read)

router.delete('/:id', delet)

module.exports = router