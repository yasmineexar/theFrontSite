const etudiant = require('../models/etudiant')
const faculte = require('../models/faculte')

exports.read = (req, res) => {
    if (req.query.json) {
        return etudiant.getAll().then(rows => {
            let c = []
            rows.forEach(element => {
                c.push(
                    faculte.getById(element.Id_faculte).then((rows) => {
                        element.faculte = rows[0]
                    })
                )
            });
            Promise.all(c).then(() => {
                return res.json(rows)
            })
            //console.log(rows[0])
        })
    }
    if (req.params.id) {
        return etudiant.getById(req.params.id).then((etudiants) => {
            return res.render('etudiants/profil', { etudiants: etudiants[0] })
        })
    }
    return res.render('etudiants/all_admin')
}
exports.create = (req, res) => {

};
exports.update = (req, res) => {

}
exports.delet = (req, res) => {

};