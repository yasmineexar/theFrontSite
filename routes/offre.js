const router = require("express").Router()
const { entreprise } = require(".")
const { creat, edit, add, read, update, delet,addtowish } = require("../Controllers/OffresController")

router.get('/add',(req,res,next)=>{
    if(req.session.currentuser.Role !='entreprise') return res.status(403).send('unauthorized')
    return next()
},add)
router.post('/add',(req,res,next)=>{
    if(req.session.currentuser.Role !='entreprise') return res.status(403).send('unauthorized')
    return next()
}, creat)

router.get('/edit/:id',(req,res,next)=>{
    if(req.session.currentuser.Role !='entreprise') return res.status(403).send('unauthorized')
    return next()
},edit)
router.post('/edit/:id',(req,res,next)=>{
    if(req.session.currentuser.Role !='entreprise') return res.status(403).send('unauthorized')
    return next()
}, update)

router.get('/', read)
router.get('/:id', read)
router.post('/wish',addtowish)
router.get('/delete/:id',(req,res,next)=>{
    if(req.session.currentuser.Role !='entreprise') return res.status(403).send('unauthorized')
    return next()
}, delet)

module.exports = router