
const Metier = require("../Models/Metier");
const Faculte = require("../Models/Faculte")

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
    metier.creat().then(() => {
        return res.redirect('add')
    })
};
exports.update = (req, res) => {

}