
const router = require("express").Router()
const { read } = require("../Controllers/FaculteController")


router.get('/', read)
router.get('/:id', read)

module.exports = router




