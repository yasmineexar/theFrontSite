const Offre = require("../Models/Offre");
const Entreprise = require('../models/Entreprise')

exports.create = (req, res) => {

};
exports.update = (req, res) => {

}
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
exports.delet = (req, res) => {

};