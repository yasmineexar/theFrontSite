const router = require("express").Router()
const { entreprise } = require(".")
const { creat, edit, add, read, update, delet,addtowish ,deletewish} = require("../Controllers/OffresController")

router.get('/', read)
router.post('/wish',addtowish)
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
router.post('/edit/:id', update)

router.get('/delete/:id', delet)
router.delete('/wish/:id',deletewish)
router.get('/:id', read)
module.exports = router