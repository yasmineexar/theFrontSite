const Metier = require("../Models/Metier");
const Faculte = require("../Models/Faculte");
const { request } = require("express");

exports.read = (req, res) => {
    if (req.query.json) {
        return Metier.getAll().then(rows => {
            return res.json(rows)
        })
    }
    return res.render('metiers/all')
};
exports.delet = (req, res) => {
    return Metier.delet(req.params.id).then(() => {
        req.session.message = {
            type: 'success',
            intro: 'Succés !',
            message: 'Métier a bien été supprimé.'
        }
        return res.redirect('/metier')
    })
};
exports.add = (req, res) => {
    Faculte.getAll().then((rows) => {
        return res.render('metiers/add', { faculte: rows })
    })
}
exports.creat = (req, res) => {
    //Description, Image, Nom, Id_faculte
    const Description = req.body.Description
    const Image = req.body.Image
    const Nom = req.body.Nom
    const Id_faculte = req.body.Id_faculte
    let metier = new Metier()
    metier.Description = Description
    metier.Image = Image
    metier.Nom = Nom
    metier.Id_faculte = Id_faculte
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
        metier.creat().then(() => {
            req.session.message = {
                type: 'success',
                intro: 'Succés !',
                message: 'Métier a bien été créé.'
            }
            return res.redirect('add')
        })
    }
}
exports.edit = (req, res) => {
    Promise.all([Metier.getById(req.params.id), Faculte.getAll()]).then((a) => {
        metier = a[0]
        facultes = a[1]
        return res.render('metiers/edit', { metier: metier[0], facultes })
    })
}
exports.update = (req, res) => {
    let m = new Metier()
    Metier.getById(req.params.id).then((metier) => {
        m.Id_metier = req.params.id
        m.Description = req.body.Description || metier.Description
        m.Id_faculte = req.body.Faculte || metier.Id_faculte
        m.Image = req.body.Image || metier.Image
        m.Nom = req.body.Nom || metier.Nom
        if (req.body.Description == '' || req.body.Nom == '' || req.body.Id_faculte == '') {
            req.session.message = {
                type: 'danger',
                intro: 'Champs vides !',
                message: 'Veuillez insérer les informations requises.'
            }
        } else {
            m.update().then(() => {
                req.session.message = {
                    type: 'success',
                    intro: 'Succés !',
                    message: 'Métier a bien été modifié.'
                }
                res.redirect('/metier/edit/' + req.params.id)
            })
        }
    })
}