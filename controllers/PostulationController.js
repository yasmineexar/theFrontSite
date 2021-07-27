const Postulation = require("../models/Postulation")
var pdf = require("pdf-creator-node");

const fs = require('fs')

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
        if (postulation.Etat == "en attente") {
            var png = fs.readFileSync("public/img/observatoire.png")
            let observatoire = png.toString('base64')
            var html = fs.readFileSync("demande_stage.html", "utf8");
            var options = {
                format: "A4",
                orientation: "portrait",
            };

            var document = {
                html: html,
                data: {
                    observatoire
                },
                path: "../output.pdf",
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
        }
    })
}