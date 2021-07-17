
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
    if (req.body.nomp == '' || req.body.penomp == '' || req.body.emailp == '' || req.body.usernamep == '' || req.body.passwordp == '') {
        req.session.message = {
            type: 'danger',
            intro: 'Champs vides!',
            message: 'Veuillez insérer les informations requises.'
        }
        return res.redirect('addpilote')
    } else if (req.body.Nom == 'jsp') {
        req.session.message = {
            type: 'warning',
            intro: 'Ce métier existe déja!',
            message: 'Veuillez insérer de nouvelles informations.'
        }
        return res.redirect('addpilote')
    }
    else {
        console.log('avant create')
        pilote.create().then(() => {
            console.log('after create')
            req.session.message = {
                type: 'success',
                intro: 'Succés !',
                message: 'Métier a bien été créé.'
            }
            return res.redirect('addpilote')
        })
    }
};
exports.editpilote = (req, res) => {
    return User.getPiloteById(req.params.id).then((pilotes) => {
        return res.render('pilotes/edit', { pilotes: pilotes[0] })
    })
}
exports.updatepilote = (req, res) => {
    const Nom = req.body.nomp
    const Prenom = req.body.prenomp
    const Email = req.body.emailp
    const Username = req.body.usernamep
    const Password = req.body.passwordp
    const Id_utilisateur = req.params.id
    let pilote = new User()
    pilote.Nom = Nom
    pilote.Prenom = Prenom
    pilote.Email = Email
    pilote.Username = Username
    pilote.Password = Password
    pilote.Id_utilisateur = Id_utilisateur
    if (req.body.nomp == '' || req.body.prenomp == '' || req.body.emailp == '') {
        req.session.message = {
            type: 'danger',
            intro: 'Champs vides !',
            message: 'Veuillez insérer les informations requises.'
        }
    } else {
        pilote.updatepilote(req.params.id).then(() => {
            req.session.message = {
                type: 'success',
                intro: 'Succés !',
                message: 'Métier a bien été modifié.'
            }
            return res.redirect('/user/editpilote/' + req.params.id)
        })
    }
}
exports.deletepilote = (req, res) => {
    return User.delet(req.params.id).then(() => {
        req.session.message = {
            type: 'success',
            intro: 'Succés !',
            message: 'Utilisateur a bien été supprimé.'
        }
        return res.redirect('/user/allpilote')
    })
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
exports.delet = (req, res) => {

}