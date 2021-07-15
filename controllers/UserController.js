
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
    pilote.nom = nomp
    pilote.prenom = prenomp
    pilote.email = emailp
    pilote.username = usernamep
    pilote.role = rolep
    pilote.password = passwordp
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

exports.login = (req, res) => {
    User.getByUsername(req.body.username).then((userrow) => {
        if (!userrow) return res.render('login/login-register', { error: 'utilisateur introuvable' })
        /* if (req.body.password == userrow.Password) return res.json(userrow) */
        bcrypt.compare(req.body.password, userrow.Password, function (err, result) {
            if (result == true) {
                return res.json(userrow)
            } else {
                res.send('Incorrect password')
                res.redirect('login')
            }
        })
    })
}