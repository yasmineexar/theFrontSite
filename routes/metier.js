const router = require("express").Router()
const { creat, edit, add, read, update, delet } = require("../Controllers/MetierController")

router.get('/add',(req,res,next)=>{
    if(req.session.currentuser.Role == 'admin' || req.session.currentuser.Role == 'pilote') return next()
    return res.status(403).send('unauthorized')
}, add)
router.post('/add', (req,res,next)=>{
    if(req.session.currentuser.Role == 'admin' || req.session.currentuser.Role == 'pilote') return next()
    return res.status(403).send('unauthorized')
},creat)

router.get('/edit/:id', (req,res,next)=>{
    if(req.session.currentuser.Role == 'admin' || req.session.currentuser.Role == 'pilote') return next()
    return res.status(403).send('unauthorized')
},edit)
router.post('/edit/:id',(req,res,next)=>{
    if(req.session.currentuser.Role == 'admin' || req.session.currentuser.Role == 'pilote') return next()
    return res.status(403).send('unauthorized')
}, update)

router.get('/', read)
router.get('/:id', read)

router.get('/delete/:id', (req,res,next)=>{
    if(req.session.currentuser.Role == 'admin' || req.session.currentuser.Role == 'pilote') return next()
    return res.status(403).send('unauthorized')
},delet)

module.exports = router