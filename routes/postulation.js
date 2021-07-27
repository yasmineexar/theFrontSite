const router = require("express").Router()
const { create, download } = require("../controllers/PostulationController")



router.post("/", create)
router.get("/download/:id", download)
module.exports = router