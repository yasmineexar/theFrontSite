
const router = require("express").Router()
const { createpilote, editpilote, addpilote, readpilote, updatepilote, delet } = require("../Controllers/UserController")

//routes pilote
router.get('/addpilote', addpilote)
router.post('/addpilote', function (req, res) { createpilote })

router.get('/allpilote', readpilote)
router.get('/:id', readpilote)

router.post('/editpilote/:id', function (req, res) { updatepilote })
router.get('/editpilote/:id', editpilote)

router.delete('/:id', delet)

module.exports = router
