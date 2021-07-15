const express = require('express')
const fileUpload = require('express-fileupload')
const app = express()
const routes = require('./routes')

app.use(express.json())
app.use(fileUpload())
app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'ejs')
app.use("/public", express.static("./public"))

app.use('/entreprise', routes.entreprise)
app.use('/etudiant', routes.etudiant)
app.use('/faculte', routes.faculte)
app.use('/offre', routes.offre)
app.use('/metier', routes.metier)
app.use('/user', routes.user)

app.listen(3000, function () {
    console.log("App started at port 3000!!")
})