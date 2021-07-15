const router = require('express').Router()
const { creat, add, edit, read, update, delet } = require('../controllers/EntrepriseController')

router.get('/add', add)
router.post('/add', creat)

router.get('/', read)
router.get('/:id', read)

router.post('/edit/:id', update)
router.get('/edit/:id', edit)

router.delete('/:id', delet)

module.exports = router