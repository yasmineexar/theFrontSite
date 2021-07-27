const Entreprise = require('../models/Entreprise')
const Offre = require("../Models/Offre");
const bcrypt = require("bcryptjs");
const e = require('express');

exports.read = (req, res) => {
    if (req.query.json) {
        return Entreprise.getAll().then(rows => {
            return res.json(rows)
        })
    }
    if (req.params.id) {
        return Entreprise.getById(req.params.id).then((entreprise) => {
            console.log(entreprise)
            Offre.getAll().then(offres => {
                offres = offres.filter((e) => {
                    return e.Id_utilisateur == entreprise.Id_utilisateur
                })
                return res.render('entreprises/profil', { entreprises: entreprise, offres })
            })
        })
    }
    return res.render('entreprises/all')
}
exports.add = (req, res) => {
    return res.render('entreprises/add')
}
exports.creat = (req, res) => {
    let entreprise = new Entreprise()
    let uploaded_image;
    let uploadPath;
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('Aucune image n a eté telechargée')
    }
    uploaded_image = req.files.uploaded_image
    uploadPath = 'upload/logo/' + uploaded_image.name;
    console.log(uploaded_image)
    if (req.body.Description == '' || req.body.Raison_social == '' || req.body.Secteur_activite == '' || req.body.Localite == '' || req.body.Site_web == '') {
        req.session.message = {
            type: 'danger',
            intro: 'Champs vides!',
            message: 'Veuillez insérer les informations requises.'
        }
        return res.redirect('add')
    } else if (req.body.Nom == 'jsp') {
        req.session.message = {
            type: 'warning',
            intro: 'Cette entreprise existe déja!',
            message: 'Veuillez insérer de nouvelles informations.'
        }
        return res.redirect('add')
    }
    else {
        uploaded_image.mv(uploadPath, function (err) {
            if (err) return res.status(500).send(err);
            logo = uploaded_image.name
            entreprise.Logo = logo
            console.log('entreprise logo:', entreprise.Logo)
            entreprise.Raison_social = req.body.Raison_social
            entreprise.Secteur_activite = req.body.Secteur_activite
            entreprise.Site_web = req.body.Site_web
            entreprise.Localite = req.body.Localite
            entreprise.Description = req.body.Description
            entreprise.creat().then(() => {
                req.session.message = {
                    type: 'success',
                    intro: 'Succés !',
                    message: 'Entreprise a bien été créée.'
                }
                return res.redirect('add')
            })
        })
    }
}
exports.edit = (req, res) => {
    return Entreprise.getById(req.params.id).then((entreprises) => {
        return res.render('entreprises/edit', { entreprises: entreprises })
    })
}
exports.delet = (req, res) => {
    console.log('coucou')
    return Entreprise.delet(req.params.id).then(() => {
        req.session.message = {
            type: 'success',
            intro: 'Succés !',
            message: 'Entreprise a bien été supprimé.'
        }
        return res.redirect('/entreprise')
    })
}

//creer un compte entreprise
exports.createcompte = (req, res) => {
    const nom = req.body.nom
    const prenom = req.body.prenom
    const email = req.body.email
    const username = req.body.username
    const password = req.body.password
    const Raison_social = req.body.Raison_social
    let compte = new Entreprise()
    compte.nom = nom
    compte.prenom = prenom
    compte.email = email
    compte.username = username
    //password hash function
    saltRounds = 10
    bcrypt.genSalt(saltRounds, function (err, salt) {
        bcrypt.hash(password, salt, function (err, hash) {
        });
    });
    compte.Raison_social = Raison_social
    compte.createcompte().then(() => {
        res.render('entreprises/compteentreprise')
    })
}


exports.update = (req, res) => {
    let e = new Entreprise()
    Entreprise.getById(req.params.id).then((entreprise) => {
        e.Id_utilisateur = req.params.id
        e.Secteur_activite = req.body.Secteur_activite || entreprise.Secteur_activite
        e.Raison_social = req.body.Raison_social || entreprise.Raison_social
        e.Description = req.body.Description || entreprise.Description
        e.Site_web = req.body.Site_web || entreprise.Site_web
        e.Localite = req.body.Localite || entreprise.Localite
        if (req.body.Description == '' || req.body.Raison_social == '' || req.body.Secteur_activite == '' || req.body.Localite == '' || req.body.Site_web == '') {
            req.session.message = {
                type: 'danger',
                intro: 'Champs vides!',
                message: 'Veuillez insérer les informations requises.'
            }
        }
        else {
            e.update().then(() => {
                req.session.message = {
                    type: 'success',
                    intro: 'Succés !',
                    message: 'Entreprise a bien été créée.'
                }
                res.redirect('/entreprise/edit/' + req.params.id)
            })
        }
    })
}
