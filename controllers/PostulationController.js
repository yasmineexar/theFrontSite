const Postulation = require("../models/Postulation")



exports.create = (req,res)=>{
    let postulation = new Postulation(req.body.Id_offre,req.session.currentuser.id)
    postulation.Date_postulation = new Date()
    postulation.Etat = "en attente"

    postulation.create().then(()=>{
        return res.send("ok")
    }).catch(e=>{
        return res.send(e)
    })
}