
const router = require("express").Router()
const { create, addpilote, read, update, delet } = require("../Controllers/UserController")


router.get('/', read)
router.get('/addpilote', addpilote)
router.get('/:id', read)
router.post('/addpilote', create)
router.post('/:id', update)
router.delete('/:id', delet)

module.exports = router




