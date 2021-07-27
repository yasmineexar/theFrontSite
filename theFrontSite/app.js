const express = require('express');
const mysql = require('mysql');
const app = express();

const routes = require('./routes');


app.set('view engine', 'ejs')

app.use('/entreprise', routes.entreprise)
app.use("/public", express.static("./public"));



app.listen(3000, function () {
    console.log("App started at port 3000!!");
});