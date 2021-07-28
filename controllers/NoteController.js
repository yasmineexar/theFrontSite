
const Note = require("../Models/Note");

exports.create = (req, res) => {
    let note = new Note()
    note.Id_utilisateur = req.session.currentuser.id
    note.Id_etudiant = req.params.id
    note.Note = req.body.note
    note.Commentaire = req.body.commentaire
    note.create().then(() => {
        res.redirect('/etudiant/' + req.params.id)
    })
};

exports.read = (req, res) => {

};

