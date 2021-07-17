
const router = require("express").Router()
const { createpilote, deletepilote, editpilote, addpilote, readpilote, updatepilote, delet, login } = require("../Controllers/UserController")
const { create } = require('../controllers/EtudiantController')

//routes pilote
router.get('/addpilote', addpilote)
router.post('/addpilote', createpilote)

//routes register and login 
router.post('/register', create)
router.get('/register', (req, res) => {
    return res.render('login/login-register')
})
router.post('/login', login)
router.get('/login', (req, res) => {
    return res.render('login/login-register')
})

//routes pilote (id)
router.get('/allpilote', readpilote)
router.get('/:id', readpilote)

router.get('/editpilote/:id', editpilote)
router.post('/editpilote/:id', updatepilote)

router.get('/deletepilote/:id', deletepilote)
router.delete('/:id', delet)

module.exports = router
