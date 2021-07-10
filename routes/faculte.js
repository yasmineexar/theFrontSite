
const router = require("express").Router()
const { creat, read, update, delet } = require("../Controllers/FaculteController")


router.get('/', read)
router.get('/:id', read)
router.post('/', creat)
router.post('/:id', update)
router.delete('/:id', delet)

module.exports = router




