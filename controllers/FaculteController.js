
const Faculte = require("../Models/Faculte");

exports.delet = (req, res) => {

}
exports.update = (req, res) => {

}
exports.creat = (req, res) => {

}
exports.read = (req, res) => {
    if (req.query.json) {
        return Faculte.getAll().then(rows => {
            return res.json(rows)
        })
    }
    if (req.params.id) {
        return Faculte.getById(req.params.id).then((faculte) => {
            return res.render('offres/all', { faculte: faculte[0] })
        })
    }
}