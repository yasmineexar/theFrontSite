
const Metier = require("../Models/Metier");

exports.create = (req, res) => {

};
exports.update = (req, res) => {

}
exports.read = (req, res) => {
    if (req.query.json) {
        return Metier.getAll().then(rows => {
            return res.json(rows)
        })
    }
    return res.render('metiers/all')
};
exports.delet = (req, res) => {

};
exports.add = (req, res) => {
    return res.render('metiers/add')
}
