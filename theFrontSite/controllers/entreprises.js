const Entreprise = require('../models/Entreprise')

exports.index = (req, res) => {
    if (req.query.json) {
        return Entreprise.getAll().then(rows => {
            return res.json(rows)
        })
    }
    return res.render('entreprises/all')

}