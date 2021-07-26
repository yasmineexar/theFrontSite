const router = require("express").Router()
const {create} = require("controllers/PostulationController")



router.post("/",create)