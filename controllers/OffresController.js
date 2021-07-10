const Offre = require("../Models/Offre");
const Entreprise = require('../models/Entreprise')

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
    return res.render('offres/add')
}
exports.creat = (req, res) => {
    const Duree_stage = req.body.Duree_stage
    const Base_remuneration = req.body.Base_remuneration
    const Nb_places = req.body.Nb_places
    const Description = req.body.Description
    const Titre = req.body.Titre
    let offre = new Offre()
    offre.Duree_stage = Duree_stage
    offre.Base_remuneration = Base_remuneration
    offre.Nb_places = Nb_places
    offre.Description = Description
    offre.Titre = Titre
    offre.creat().then(() => {
        return res.redirect('add')
    })
};
exports.update = (req, res) => {

}
exports.delet = (req, res) => {

};