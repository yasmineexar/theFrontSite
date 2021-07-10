const Entreprise = require('../models/Entreprise')
const Offre = require("../Models/Offre");

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
exports.delet = (req, res) => {

}
exports.update = (req, res) => {

}
exports.add = (req, res) => {
    return res.render('entreprises/add')
}
exports.creat = (req, res) => {
    console.log('1')
    const Raison_social = req.body.Raison_social
    const Secteur_activite = req.body.Secteur_activite
    const Site_web = req.body.Site_web
    const Localite = req.body.Localite
    const Description = req.body.Description
    let entreprise = new Entreprise()
    console.log('2')
    entreprise.Raison_social = Raison_social
    entreprise.Secteur_activite = Secteur_activite
    entreprise.Site_web = Site_web
    entreprise.Localite = Localite
    entreprise.Description = Description
    entreprise.creat().then(() => {
        console.log('3')
        return res.redirect('add')
    })
    console.log('4')
}

