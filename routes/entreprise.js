const router = require('express').Router()
const { creat, add, edit, read, update, delet, createcompte } = require('../controllers/EntrepriseController')

router.get('/add', add)
router.post('/add', creat)

//route creer compte 
router.get('/compte', (req, res) => {
    res.render('entreprises/compteentreprise')
})
router.post('/compte', createcompte)
//route creer compte 

router.get('/', read)
router.get('/:id', read)

router.post('/edit/:id', update)
router.get('/edit/:id', edit)

router.delete('/:id', delet)

module.exports = router