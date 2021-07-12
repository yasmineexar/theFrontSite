
const User = require("../Models/User");

//CRUD pilote
exports.readpilote = (req, res) => {
    if (req.query.json) {
        return User.getAllPilote().then(rows => {
            return res.json(rows)
        })
    }
    return res.render('pilotes/all')
};
exports.addpilote = (req, res) => {
    return res.render('pilotes/add')
}
exports.createpilote = (req, res) => {
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
        return res.redirect('addpilote')
    })
};
exports.editpilote = (req, res) => {
    return User.getPiloteById(req.params.id).then((pilotes) => {
        return res.render('pilotes/edit', { pilotes: pilotes[0] })
    })
}
exports.update = (req, res) => {

}
exports.delet = (req, res) => {

};

//CRUD pilote
