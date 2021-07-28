const router = require('express').Router()
const { creat, add, edit, read, update, delet, createcompte } = require('../controllers/EntrepriseController')
const Entreprise = require('../models/Entreprise')

router.get('/add', (req, res, next) => {
    if (req.session.currentuser.Role != 'admin' || req.session.currentuser.Role == 'pilote') return next()
    return res.status(403).send('unauthorized')
}, add)
router.post('/add', (req, res, next) => {
    if (req.session.currentuser.Role != 'admin' || req.session.currentuser.Role == 'pilote') return next()
    return res.status(403).send('unauthorized')
}, creat)

//route creer compte 
router.get('/compte', (req, res, next) => {
    if (req.session.currentuser.Role == 'admin' || req.session.currentuser.Role == 'pilote') return next()
    return res.status(403).send('unauthorized')
}, (req, res) => {
    Entreprise.getAllold().then(old => {
        Entreprise.getAll().then(n => {
            old = old.filter(e => !n.includes(e))
            res.render('entreprises/compteentreprise', { old })
        })
    })
})
router.post('/compte', (req, res, next) => {
    if (req.session.currentuser.Role == 'admin' || req.session.currentuser.Role == 'pilote') return next()
    return res.status(403).send('unauthorized')
}, createcompte)
//route creer compte 

router.get('/', (req, res, next) => {
    if (req.session.currentuser.Role == 'admin' || req.session.currentuser.Role == 'pilote') return next()
    return res.status(403).send('unauthorized')
}, read)
router.get('/:id', read)

router.post('/edit/:id', (req, res, next) => {
    if (req.session.currentuser.id != req.params.id && req.session.currentuser.Role != "admin" && req.session.currentuser.Role != 'pilote') return res.status(403).send('unauthorized')
    if (req.session.currentuser.Role != 'etudiant') return next()
    return res.status(403).send('unauthorized')
}, update)
router.get('/edit/:id', (req, res, next) => {
    if (req.session.currentuser.Role == 'admin' || req.session.currentuser.Role == 'pilote' || req.session.currentuser.id == req.params.id) return next()
    return res.status(403).send('unauthorized')
}, edit)

router.get('/delete/:id', (req, res, next) => {
    if (req.session.currentuser.Role == 'admin' || req.session.currentuser.Role == 'pilote') return next()
    return res.status(403).send('unauthorized')
}, delet)

module.exports = router