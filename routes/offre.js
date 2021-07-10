const router = require("express").Router()
const { creat, add, read, update, delet } = require("../Controllers/OffresController")

router.get('/', read)
router.get('/add', add)
router.get('/:id', read)
router.post('/add', creat)
router.post('/:id', update)
router.delete('/:id', delet)

module.exports = router