
const router = require("express").Router()
const { create, addpilote, readpilote, update, delet } = require("../Controllers/UserController")

//routes pilote
router.get('/allpilote', readpilote)
router.get('/addpilote', addpilote)
router.get('/:id', readpilote)
router.post('/addpilote', create)
router.post('/:id', update)
router.delete('/:id', delet)

module.exports = router




