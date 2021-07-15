const Offre = require("../Models/Offre");
const Entreprise = require('../models/Entreprise')
const Faculte = require("../Models/Faculte")

exports.read = (req, res) => {
    if (req.query.json) {
        return Offre.getAll().then(rows => {
            let c = []
            rows.forEach(element => {
                c.push(
                    Entreprise.getById(element.Id_entrepold).then((rows) => {
                        element.Entreprise = rows[0]
                    })
                )
            });
            Promise.all(c).then(() => {
                return res.json(rows)
            })
        })
    }
    return res.render('offres/all')
};
exports.add = (req, res) => {
    Faculte.getAll().then((rows) => {
        return res.render('offres/add', { faculte: rows })
    })
}
exports.creat = (req, res) => {
    const Duree_stage = req.body.Duree_stage
    const Base_remuneration = req.body.Base_remuneration
    const Nb_places = req.body.Nb_places
    const Description = req.body.Description
    const Titre = req.body.Titre
    const Id_faculte = req.body.Id_faculte
    let offre = new Offre()
    offre.Duree_stage = Duree_stage
    offre.Base_remuneration = Base_remuneration
    offre.Nb_places = Nb_places
    offre.Description = Description
    offre.Titre = Titre
    offre.Id_faculte = Id_faculte
    offre.creat().then(() => {
        return res.redirect('add')
    })
};
exports.edit = (req, res) => {
    Promise.all([Offre.getById(req.params.id), Faculte.getAll()]).then((a) => {
        offre = a[0]
        facultes = a[1]
        return res.render('offres/edit', { offre: offre[0], facultes })
    })
}
exports.update = (req, res) => {
    let o = new Offre()
    Offre.getById(req.params.id).then((offre) => {
        console.log('body', req.body)
        o.Id_offre = req.params.id
        o.Base_remuneration = req.body.Base_remuneration || offre.Base_remuneration
        o.Duree_stage = req.body.Duree_stage || offre.Duree_stage
        o.Description = req.body.Description || offre.Description
        o.Id_faculte = req.body.Id_faculte || offre.Id_faculte
        o.Nb_places = req.body.Nb_places || offre.Nb_places
        o.Titre = req.body.Titre || offre.Titre
        console.log('offre', offre)
        o.update().then(() => {
            res.redirect('/offre/edit/' + req.params.id)
        })
    })
}
exports.delet = (req, res) => {

};