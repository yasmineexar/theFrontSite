const etudiant = require('../models/etudiant')
const faculte = require('../models/faculte')
const bcrypt = require('bcryptjs')

exports.read = (req, res) => {
    if (req.query.json) {
        return etudiant.selectwhere({ Nom: req.query.searchNom, Prenom: req.query.searchPrenom, Id_faculte: req.query.searchFaculte }).then(rows => {
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

//register etudiant 
exports.create = (req, res) => {
    try {
        //recupération des data 
        const matricule = req.body.matricule;
        const username = req.body.username;
        var password = req.body.password;
        let e = new etudiant()
        e.matricule = matricule
        e.username = username
        //password hash function
        saltRounds = 10
        bcrypt.genSalt(saltRounds, function (err, salt) {
            bcrypt.hash(password, salt, function (err, hash) {
                e.password = hash
            });
        });
        if (req.body.matricule == '' || req.body.username == '' || req.body.password == '') {
            req.session.message = {
                type: 'danger',
                intro: 'Champs vides!',
                message: 'Veuillez insérer les informations requises.'
            }
            return res.redirect('register')
        } else if (req.body.matricule == 'jsp') {
            req.session.message = {
                type: 'warning',
                intro: 'Ce matricule n existe pas!',
                message: 'Veuillez insérer de nouvelles informations.'
            }
            return res.redirect('register')
        }
        else {
            e.create().then(() => {
                req.session.message = {
                    type: 'success',
                    intro: 'Succés !',
                    message: 'Compte Etudiant a bien été créé.'
                }
                return res.redirect('register')
            })
        }
    }
    catch (error) {
        console.log(error)
    }

};
exports.update = (req, res) => {

}
exports.find = (req, res) => {
    console.log(1)
    const searchNom = req.body.searchNom
    const searchPrenom = req.body.searchPrenom
    const searchFaculte = req.body.searchFaculte
    let e = new etudiant()
    e.searchNom = searchNom
    e.searchPrenom = searchPrenom
    e.searchFaculte = searchFaculte
    console.log(2)
    e.search().then((rows) => {
        console.log(3)
        console.log(rows)
        return res.render('etudiants/all_admin', { rows })
    })
}
exports.delet = (req, res) => {

};