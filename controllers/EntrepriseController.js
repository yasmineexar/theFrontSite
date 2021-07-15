const Entreprise = require('../models/Entreprise')
const Offre = require("../Models/Offre");
const bcrypt = require("bcryptjs")
exports.read = (req, res) => {
    if (req.query.json) {
        return Entreprise.getAll().then(rows => {
            return res.json(rows)
        })
    }
    if (req.params.id) {
        return Entreprise.getById(req.params.id).then((entreprises) => {
            Offre.getAll().then(results => {
                offres = results.filter((e) => {
                    return e.Id_entrepold == entreprises[0].Id_entrepold
                })
                return res.render('entreprises/profil', { entreprises: entreprises[0], offres })
            })
        })
    }
    return res.render('entreprises/all')
}
exports.add = (req, res) => {
    return res.render('entreprises/add')
}
exports.creat = (req, res) => {
    const Raison_social = req.body.Raison_social
    const Secteur_activite = req.body.Secteur_activite
    const Site_web = req.body.Site_web
    const Localite = req.body.Localite
    const Description = req.body.Description
    let entreprise = new Entreprise()
    entreprise.Raison_social = Raison_social
    entreprise.Secteur_activite = Secteur_activite
    entreprise.Site_web = Site_web
    entreprise.Localite = Localite
    entreprise.Description = Description
    entreprise.creat().then(() => {
        return res.redirect('add')
    })
}
exports.edit = (req, res) => {
    return Entreprise.getById(req.params.id).then((entreprises) => {
        return res.render('entreprises/edit', { entreprises: entreprises[0] })
    })
}
exports.update = (req, res) => {
    const Raison_social = req.body.Raison_social
    const Secteur_activite = req.body.Secteur_activite
    const Site_web = req.body.Site_web
    const Localite = req.body.Localite
    const Description = req.body.Description
    const Id_entrepold = req.params.id
    let entreprise = new Entreprise()
    entreprise.Raison_social = Raison_social
    entreprise.Secteur_activite = Secteur_activite
    entreprise.Site_web = Site_web
    entreprise.Localite = Localite
    entreprise.Description = Description
    entreprise.Id_entrepold = Id_entrepold
    entreprise.update(req.params.id).then(() => {
        Entreprise.getById(req.params.id).then((entreprises) => {
            return res.render('entreprises/edit', { entreprises: entreprises[0] })
        })
    })
}
exports.delet = (req, res) => {

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
            console.log(hash)
            compte.password = hash
            console.log(compte.password)
        });
    });
    compte.Raison_social = Raison_social
    compte.createcompte().then(() => {
        console.log('hi bish')
        res.render('entreprises/compteentreprise')
    })


}