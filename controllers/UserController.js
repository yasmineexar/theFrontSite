
const User = require("../Models/User");
const bcrypt = require('bcryptjs')
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
    const rolep = 'pilote'
    const passwordp = req.body.passwordp
    let pilote = new User()
    pilote.Nom = nomp
    pilote.Prenom = prenomp
    pilote.Email = emailp
    pilote.Username = usernamep
    pilote.Role = rolep
    pilote.Password = passwordp
    //password hash function
    /*let saltRounds = 10
   bcrypt.genSalt(saltRounds, function (err, salt) {
       bcrypt.hash(passwordp, salt, function (err, hash) {
           console.log(hash)
           
           console.log(pilote.Password)
       });
   }); */
    console.log('avant create')
    pilote.create().then(() => {
        console.log('after create')
        return res.redirect('addpilote')
    })
};
exports.editpilote = (req, res) => {
    return User.getPiloteById(req.params.id).then((pilotes) => {
        return res.render('pilotes/edit', { pilotes: pilotes[0] })
    })
}
exports.updatepilote = (req, res) => {

}
exports.delet = (req, res) => {

};

//CRUD pilote
