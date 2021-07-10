const express = require('express');
const mysql = require('mysql');
const app = express();
const fileUpload = require('express-fileupload')

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const routes = require('./routes');

app.use(fileUpload());

app.set('view engine', 'ejs')

app.use('/entreprise', routes.entreprise)
app.use('/etudiant', routes.etudiant)
app.use('/faculte', routes.faculte)
app.use('/offre', routes.offre)
app.use('/metier', routes.metier)
app.use('/user', routes.user)

app.use("/public", express.static("./public"));



app.listen(3000, function () {
    console.log("App started at port 3000!!");
});