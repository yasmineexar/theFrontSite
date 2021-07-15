
const router = require("express").Router()
const { createpilote, editpilote, addpilote, readpilote, updatepilote, delet } = require("../Controllers/UserController")

//routes pilote
router.get('/addpilote', addpilote)
router.post('/addpilote', createpilote)

router.get('/allpilote', readpilote)
router.get('/:id', readpilote)

router.get('/editpilote/:id', editpilote)
router.post('/editpilote/:id', updatepilote)

router.delete('/:id', delet)

module.exports = router
