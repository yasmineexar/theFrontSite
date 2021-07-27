const router = require("express").Router()
const { create, download ,read,state} = require("../controllers/PostulationController")



router.post("/", create)
router.get('/',read)
router.post('/update',state)
router.get("/download/:id", download)
module.exports = router