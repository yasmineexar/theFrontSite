
const router = require("express").Router()
const { createpilote, deletepilote, editpilote, addpilote, readpilote, updatepilote, delet, login } = require("../Controllers/UserController")
const { create } = require('../controllers/EtudiantController')

//route home 


//routes pilote
router.get('/addpilote',(req,res,next)=>{
    if(req.session.currentuser.Role != "admin") return res.status(403).send('unauthorized')
    return next()
}, addpilote)
router.post('/addpilote',(req,res,next)=>{
    if(req.session.currentuser.Role != "admin") return res.status(403).send('unauthorized')
    return next()
}, createpilote)

//routes register and login 

//routes pilote (id)
router.get('/allpilote',(req,res,next)=>{
    if(req.session.currentuser.Role != "admin") return res.status(403).send('unauthorized')
    return next()
}, readpilote)
router.get('/:id',(req,res,next)=>{
    if(req.session.currentuser.Role == "admin" || req.session.currentuser.id == req.params.id)return next()
    return res.status(403).send('unauthorized')
}, readpilote)

router.get('/editpilote/:id',(req,res,next)=>{
    if(req.session.currentuser.Role == "admin" || req.session.currentuser.id == req.params.id)return next()
    return res.status(403).send('unauthorized')
}, editpilote)
router.post('/editpilote/:id',(req,res,next)=>{
    if(req.session.currentuser.Role == "admin" || req.session.currentuser.id == req.params.id)return next()
    return res.status(403).send('unauthorized')
}, updatepilote)

router.get('/deletepilote/:id',(req,res,next)=>{
    if(req.session.currentuser.Role == "admin")return next()
    return res.status(403).send('unauthorized')
}, deletepilote)
router.delete('/:id',(req,res,next)=>{
    if(req.session.currentuser.Role == "admin")return next()
    return res.status(403).send('unauthorized')
}, delet)

module.exports = router
