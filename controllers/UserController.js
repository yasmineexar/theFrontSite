
const User = require("../Models/User");

//CRUD pilote
exports.addpilote = (req, res) => {
    return res.render('pilotes/add')
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
exports.readpilote = (req, res) => {
    if (req.query.json) {
        return User.getAllPilote().then(rows => {
            return res.json(rows)
        })
    }
    return res.render('pilotes/all')
};
exports.delet = (req, res) => {

};

