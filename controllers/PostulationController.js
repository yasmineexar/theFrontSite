const Postulation = require("../models/Postulation")
const pdf = require("pdf-creator-node");
const Offre= require('../models/Offre')
const Entreprise= require('../models/Entreprise')
const Etudiant = require('../models/Etudiant')
const Faculte = require('../models/Faculte')
const fs = require('fs')



exports.state = (req,res)=>{
    Postulation.read(req.body.Id_utilisateur,req.body.Id_offre).then((postulation)=>{
        let p = new Postulation(req.body.Id_offre,req.body.Id_utilisateur)
        p.Etat = req.body.etat

        p.update().then(()=>{
            return res.send('ok')
        })
    })
}

exports.read = (req,res)=>{
    if(req.query.json){
        Postulation.getAll().then((postulations)=>{
            let c =[]
            postulations.forEach((postulation,index)=>{
                c.push(
                    Offre.getById(postulation.Id_offre).then((offre)=>{
                        postulations[index].Offre = offre
                    })
                )
                c.push(
                    Etudiant.getById(postulation.Id_utilisateur).then(etudiant=>{
                        postulations[index].Etudiant = etudiant
                    })
                )
            })
            Promise.all(c).then(()=>{
                let a =[]
                postulations = postulations.filter(e=>e.Offre.Id_utilisateur == req.session.currentuser.id && e.Etat == "en attente")
                postulations.forEach((postulation,index)=>{
                    a.push(Faculte.getById(postulation.Etudiant.Id_faculte).then((fac)=>{
                        postulations[index].Etudiant.Faculte = fac 
                    }))
                })
                Promise.all(a).then(()=>{
                    res.json(postulations)
                })
            })
        })
    }
}



exports.create = (req, res) => {
    let postulation = new Postulation(req.body.Id_offre, req.session.currentuser.id)
    postulation.Date_postulation = new Date()
    postulation.Etat = "en attente"

    postulation.create().then(() => {
        return res.send("ok")
    }).catch(e => {
        return res.send(e)
    })
}


exports.download = (req, res) => {
    let path = __dirname.split('\\')
    path.pop()
    path = path.join('\\')
    console.log(path)
    Postulation.read(req.session.currentuser.id, req.params.id).then((results) => {

        let postulation = results[0]
        var png = fs.readFileSync("public/img/observatoire.png")
        let observatoire = png.toString('base64')
        var options = {
            format: "A4",
            orientation: "portrait",

        };
        
        if (postulation.Etat == "en attente") {
            var html = fs.readFileSync("demande_stage.html", "utf8");
            let c = []
            let etudiant = offre =  undefined 
            
            c.push(Etudiant.getById(postulation.Id_utilisateur).then((e)=>{
                
                etudiant = e
            }))
            c.push(
                Offre.getById(postulation.Id_offre).then((o)=>{
                    
                    offre = o
                })
            )
            Promise.all(c).then(()=>{
                Entreprise.getById(offre.Id_utilisateur).then((e)=>{
                    offre.Entreprise = e
                    Faculte.getById(etudiant.Id_faculte).then((f)=>{
                        etudiant.Faculte = f
                        var document = {
                            html: html,
                            data: {
                                observatoire,
                                offre,
                                etudiant
                            },
                            path: `./generated/${req.session.currentuser.Nom.toUpperCase()}_${req.session.currentuser.Prenom}_Demande.pdf`,
                            type: "",
                        };
                        pdf.create(document, options)
                            .then((d) => {
                                console.log(d);
                                return res.download(d.filename)
                            })
                            .catch((error) => {
                                console.error(error);
                            });
                    })
                })
                
            })
        }else if(postulation.Etat == "accepter"){
            options.header = {
                height: "30mm",
                contents: ''
            }
            options.footer= {
                height: "28mm",
                contents: {
                    first:'',
                    default: '<div style="width:100%;text-align:right;padding-right:40px"><span style="color: #444;">{{page}}</span>/<span>{{pages}}</span></div>', // fallback value
                }
            }
            var html = fs.readFileSync("convention_stage.html", "utf8");
            let c = []
            let etudiant = offre =  undefined
            c.push(Etudiant.getById(postulation.Id_utilisateur).then((e)=>{
                
                etudiant = e
            }))
            c.push(
                Offre.getById(postulation.Id_offre).then((o)=>{
                    
                    offre = o
                })
            )
            Promise.all(c).then(()=>{
                Entreprise.getById(offre.Id_utilisateur).then((e)=>{
                    offre.Entreprise = e

                    Faculte.getById(etudiant.Id_faculte).then((f)=>{
                        etudiant.Faculte = f
                        var document = {
                            html: html,
                            data: {
                                observatoire,
                                offre,
                                etudiant,
                                postulation,
                                usthb : fs.readFileSync("public/img/logo.png").toString('base64'),
                                logoentreprise : fs.readFileSync("upload/logo/"+e.Logo).toString('base64')
                            },
                            path: `./generated/${req.session.currentuser.Nom.toUpperCase()}_${req.session.currentuser.Prenom}_Convention.pdf`,
                            type: "",
                        };
                        pdf.create(document, options)
                            .then((d) => {
                                console.log(d);
                                return res.sendFile(d.filename)
                            })
                            .catch((error) => {
                                console.error(error);
                            });
                    })
                })
                
            })
        }
    })
}