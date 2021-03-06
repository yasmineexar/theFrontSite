const etudiant = require('../models/etudiant')
const faculte = require('../models/faculte')
const bcrypt = require('bcryptjs')
const Etudiant = require('../models/etudiant')
const Postulation = require('../models/Postulation')

exports.read = (req, res) => {
    if (req.query.json) {
        return etudiant.selectwhere({ Nom: req.query.searchNom, Prenom: req.query.searchPrenom, Id_faculte: req.query.searchFaculte }).then(etudiants => {
            let c = []
            console.log(etudiants)
            etudiants.forEach(element => {
                c.push(
                    faculte.getById(element.Id_faculte).then((rows) => {
                        element.faculte = rows
                    })
                )
            });
            Promise.all(c).then(() => {
                return res.json(etudiants)
            })
        })
    }
    if (req.params.id) {
        return etudiant.getById(req.params.id).then((etudiants) => {
            faculte.getById(etudiants.Id_faculte).then(f => {
                Postulation.getByIdUser(etudiants.Id_utilisateur).then((pos) => {

                    etudiants.faculte = f
                    return res.render('etudiants/profil', { etudiants, accepted: pos.some(e => e.Etat == 'accepter') })
                })
            })
        })
    }
    if (req.session.currentuser.Role == "admin" || req.session.currentuser.Role == "pilote") return res.render('etudiants/all_admin')
    if (req.session.currentuser.Role == "entreprise") return res.render('etudiants/all_entrep')
}

//register etudiant 
exports.create = (req, res) => {
    try {
        //recupération des data 
        const matricule = req.body.matricule;
        const username = req.body.username;
        var password = req.body.password;
        let cvupload;
        let uploadPath;
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).send('Aucun fichier n a etait telechargée')
        }
        cvupload = req.files.cvupload
        console.log(cvupload)
        uploadPath = 'upload/pdf/CV/' + cvupload.name;
        let e = new etudiant()

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
            cvupload.mv(uploadPath, function (err) {
                if (err) return res.status(500).send(err);
                e.matricule = matricule
                e.username = username
                e.cv = cvupload.name
                e.create().then(() => {
                    req.session.message = {
                        type: 'success',
                        intro: 'Succés !',
                        message: 'Compte Etudiant a bien été créé.'
                    }
                    return res.redirect('/etudiant/ed')
                })
            })
        }
    }
    catch (error) {
        console.log(error)
    }

};
exports.edit = (req, res) => {
    Promise.all(Etudiant.getById(req.params.id)).then(() => {
        return res.render('etudiant/edit/' + req.params.id)
    })
}

exports.updatecv = (req, res) => {
    let e = new Etudiant()
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('Aucun fichier n a etait telechargée')
    }
    let uploadPath = 'upload/pdf/CV/' + req.files.cvupdate.name;
    console.log(req.files)
    req.files.cvupdate.mv(uploadPath, function (err) {
        if (err) return res.status(500).send(err);
        e.Cv = req.files.cvupdate.name
        e.update(req.params.id).then(() => {
            res.redirect('/etudiant/' + req.params.id)
        })
    })
}
exports.delet = (req, res) => {
    return Etudiant.delet(req.params.id).then(() => {
        return res.redirect('/etudiant')
    })
}
exports.getCv = (req, res) => {
    Etudiant.getById(req.params.id).then(e => {
        res.sendFile(path.resolve("upload/pdf/CV/" + e.Cv))
    })
}