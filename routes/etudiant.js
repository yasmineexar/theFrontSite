const router = require('express').Router()
const { read, find,updatecv } = require('../controllers/EtudiantController')


router.get('/',(req,res,next)=>{
    if(req.session.currentuser.Role== 'etudiant') return req.statusCode(403).send('unauthorized')
    return next()
},read)
router.get('/:id',(req,res,nect)=>{
    if(req.session.currentuser.Role != "etudiant" || req.session.currentuser.id == req.params.id) return next()
    return res.status(403).send('unauthorized')
}, read)
router.post('/:id',(req,res,next)=>{
    if(req.params.id == req.session.currentuser.id) return next()
    return res.status(403).send('unauthorized')
},updatecv)

module.exports = router