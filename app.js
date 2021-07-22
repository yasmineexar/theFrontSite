const express = require('express')
const fileUpload = require('express-fileupload')
const app = express()
const logger = require('morgan')
const routes = require('./routes')
const sessiion = require('express-session')
const flash = require('connect-flash')
const {isAuth} = require('./middelwares/Auth')

app.use(express.json())
app.use(fileUpload())
app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'ejs')
app.use("/public", express.static("./public"))
app.use(sessiion({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: null }
}))
app.use((req, res, next) => {
    res.locals.currentuser = req.session.currentuser
    res.locals.message = req.session.message
    delete req.session.messages
    next()
})
app.use(logger('dev'))
app.use('',routes.base)
app.use('/entreprise',isAuth, routes.entreprise)
app.use('/etudiant',isAuth, routes.etudiant)
app.use('/faculte',isAuth, routes.faculte)
app.use('/offre',isAuth, routes.offre)
app.use('/metier',isAuth, (req,res,next)=>{
    if(req.session.currentuser.Role != 'entreprise') return next()
    return res.status(403).send('unauthorized')
},routes.metier)
app.use('/user',isAuth, routes.user)

app.listen(3000, function () {
    console.log("App started at port 3000!!")
})