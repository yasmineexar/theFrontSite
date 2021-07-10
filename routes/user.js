
const router = require("express").Router()
const { create, read, update, delet } = require("../Controllers/UserController")


router.get('/', read)
router.get('/:id', read)
router.post('/', create)
router.post('/:id', update)
router.delet('/:id', delet)

module.exports = router




