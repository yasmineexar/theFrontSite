
const router = require("express").Router()
const { create, read, update, delet } = require("../Controllers/NoteController")


router.get('/', read)
router.get('/:id', read)
router.post('/:id', create)


module.exports = router




