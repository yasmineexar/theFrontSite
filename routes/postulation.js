const router = require("express").Router()
const { create, download ,read,state,delet} = require("../controllers/PostulationController")



router.delete("/",delet)
router.post("/", create)
router.get('/',read)
router.post('/update',state)
router.get("/download/:id", download)
module.exports = router