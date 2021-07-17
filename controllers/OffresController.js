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
    if (req.body.Description == '' || req.body.Nom == '' || req.body.Id_faculte == '') {
        req.session.message = {
            type: 'danger',
            intro: 'Champs vides!',
            message: 'Veuillez insérer les informations requises.'
        }
        return res.redirect('add')
    } else if (req.body.Nom == 'jsp') {
        req.session.message = {
            type: 'warning',
            intro: 'Ce métier existe déja!',
            message: 'Veuillez insérer de nouvelles informations.'
        }
        return res.redirect('add')
    }
    else {
        offre.creat().then(() => {
            req.session.message = {
                type: 'success',
                intro: 'Succés !',
                message: 'Une nouvelle offre a bien été créé.'
            }
            return res.redirect('add')
        })
    }
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
        o.Id_offre = req.params.id
        o.Base_remuneration = req.body.Base_remuneration || offre.Base_remuneration
        o.Duree_stage = req.body.Duree_stage || offre.Duree_stage
        o.Description = req.body.Description || offre.Description
        o.Id_faculte = req.body.Id_faculte || offre.Id_faculte
        o.Nb_places = req.body.Nb_places || offre.Nb_places
        o.Titre = req.body.Titre || offre.Titre
        if (req.body.Description == '' || req.body.Nom == '' || req.body.Id_faculte == '') {
            req.session.message = {
                type: 'danger',
                intro: 'Champs vides !',
                message: 'Veuillez insérer les informations requises.'
            }
        } else {
            o.update().then(() => {
                req.session.message = {
                    type: 'success',
                    intro: 'Succés !',
                    message: 'Offre a bien été modifié.'
                }
                res.redirect('/offre/edit/' + req.params.id)
            })
        }
    })
}
exports.delet = (req, res) => {
    return Offre.delet(req.params.id).then(() => {
        req.session.message = {
            type: 'success',
            intro: 'Succés !',
            message: 'Offre a bien été supprimé.'
        }
        return res.redirect('/offre')
    })
};