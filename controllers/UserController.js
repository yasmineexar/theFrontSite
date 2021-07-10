
const User = require("../Models/User");


exports.addpilote = (req, res) => {
    return res.render('admin/addpilote')
}

exports.create = (req, res) => {
    const nomp = req.body.nomp
    const prenomp = req.body.prenomp
    const emailp = req.body.emailp
    const usernamep = req.body.usernamep
    const passwordp = req.body.passwordp
    const rolep = 'pilote'
    let pilote = new User()
    pilote.Nom = nomp
    pilote.Prenom = prenomp
    pilote.Email = emailp
    pilote.Username = usernamep
    pilote.Password = passwordp
    pilote.Role = rolep
    pilote.create().then(() => {
        console.log('hello')
        return res.redirect('addpilote')
    })
};
exports.update = (req, res) => {

}
exports.read = (req, res) => {

};
exports.delet = (req, res) => {

};

