const User = require("../Models/User");
const Etudiant = require("../Models/Etudiant");
const Faculte = require("../Models/Faculte");
const Entreprise = require("../Models/Entreprise");
const bcrypt = require("bcryptjs");
//CRUD pilote
exports.readpilote = (req, res) => {
  if (req.query.json) {
    return User.getAllPilote().then((rows) => {
      return res.json(rows);
    });
  }
  return res.render("pilotes/all");
};
exports.addpilote = (req, res) => {
  return res.render("pilotes/add");
};
exports.createpilote = async (req, res) => {
  var passwordp = req.body.passwordp;
  let pilote = new User();
  pilote.nom = req.body.nomp;
  pilote.prenom = req.body.prenomp;
  pilote.email = req.body.emailp;
  pilote.username = req.body.usernamep;
  pilote.role = "pilote";
  //hash function
  const salt = await bcrypt.genSalt(10);
  passwordp = await bcrypt.hash(passwordp, salt);
  pilote.password = passwordp;

  if (
    req.body.nomp == "" ||
    req.body.penomp == "" ||
    req.body.emailp == "" ||
    req.body.usernamep == "" ||
    req.body.passwordp == ""
  ) {
    req.session.message = {
      type: "danger",
      intro: "Champs vides!",
      message: "Veuillez insérer les informations requises.",
    };
    return res.redirect("addpilote");
  } else if (req.body.Nom == "jsp") {
    req.session.message = {
      type: "warning",
      intro: "Ce métier existe déja!",
      message: "Veuillez insérer de nouvelles informations.",
    };
    return res.redirect("addpilote");
  } else {
    pilote.create().then(() => {
      req.session.message = {
        type: "success",
        intro: "Succés !",
        message: "Pilote a bien été créé.",
      };
      return res.redirect("addpilote");
    });
  }
};
exports.editpilote = (req, res) => {
  return User.getPiloteById(req.params.id).then((pilotes) => {
    return res.render("pilotes/edit", { pilotes: pilotes[0] });
  });
};
exports.updatepilote = (req, res) => {
  const Nom = req.body.nomp;
  const Prenom = req.body.prenomp;
  const Email = req.body.emailp;
  const Username = req.body.usernamep;
  const Password = req.body.passwordp;
  const Id_utilisateur = req.params.id;
  let pilote = new User();
  pilote.Nom = Nom;
  pilote.Prenom = Prenom;
  pilote.Email = Email;
  pilote.Username = Username;
  pilote.Password = Password;
  pilote.Id_utilisateur = Id_utilisateur;
  if (req.body.nomp == "" || req.body.prenomp == "" || req.body.emailp == "") {
    req.session.message = {
      type: "danger",
      intro: "Champs vides !",
      message: "Veuillez insérer les informations requises.",
    };
  } else {
    pilote.updatepilote(req.params.id).then(() => {
      req.session.message = {
        type: "success",
        intro: "Succés !",
        message: "Métier a bien été modifié.",
      };
      return res.redirect("/user/editpilote/" + req.params.id);
    });
  }
};
exports.deletepilote = (req, res) => {
  return User.delet(req.params.id).then(() => {
    req.session.message = {
      type: "success",
      intro: "Succés !",
      message: "Utilisateur a bien été supprimé.",
    };
    return res.redirect("/user/allpilote");
  });
};

//CRUD pilote

exports.login = (req, res) => {
  const URL = req.session.redirecturl;
  req.session.redirecturl = undefined
  User.getByUsername(req.body.username).then((userrow) => {
    if (!userrow)
      return res.render("login/login-register", {
        error: "utilisateur introuvable",
      });
    //if (req.body.password == userrow.Password) return res.json(userrow)
    bcrypt.compare(req.body.password, userrow.Password, function (err, result) {
      //redirect
      if (result == true) {
        if (userrow.Role == "etudiant") {
          Etudiant.getById(userrow.Id_utilisateur).then((etudiant) => {
            Faculte.getById(etudiant.Id_faculte).then(fac => {
              etudiant.Faculte = fac
              req.session.currentuser = {
                id: userrow.Id_utilisateur,
                Nom: userrow.Nom,
                Prenom: userrow.Prenom,
                Username: userrow.Username,
                Email: userrow.Email,
                Password: userrow.Password,
                Role: userrow.Role,
                Annee_etude: etudiant.Annee_etude,
                Date_naissance: etudiant.Date_naissance,
                Adresse: etudiant.Adresse,
                Num_tel: etudiant.Num_tel,
                Specialite: etudiant.Specialite,
                Matricule: etudiant.Matricule,
                Faculte: etudiant.Faculte,
                Cv: etudiant.Cv
              };
              return res.redirect(req.session.redirecturl || "/metier/");
            })
          });
        } else {
          if (userrow.Role == "entreprise") {
            Entreprise.getById(userrow.Id_utilisateur).then(entreprise => {
              req.session.currentuser = {
                id: userrow.Id_utilisateur,
                Nom: userrow.Nom,
                Prenom: userrow.Prenom,
                Username: userrow.Username,
                Email: userrow.Email,
                Password: userrow.Password,
                Role: userrow.Role,
                Logo: entreprise.Logo,
                Secteur_activite: entreprise.Secteur_activite,
                Localite: entreprise.Localite,
                Nb_stagiaire_acceptes: entreprise.Nb_stagiaire_acceptes,
                Date_creation: entreprise.Date_creation,
                Site_web: entreprise.Site_web,
                Description: entreprise.Description,
                Raison_social: entreprise.Raison_social,
              };

              return res.redirect(req.session.redirecturl || "/etudiant/");
            })
          } else {
            req.session.currentuser = {
              id: userrow.Id_utilisateur,
              Nom: userrow.Nom,
              Prenom: userrow.Prenom,
              Username: userrow.Username,
              Email: userrow.Email,
              Password: userrow.Password,
              Role: userrow.Role,
            };
            return res.redirect(req.session.redirecturl || "home");
          }
        }
      } else {
        req.session.message = {
          type: "danger",
          intro: "Mot de Passe Incorrect !",
          message: "Veuillez entrer le bon mot de passe",
        };
        res.redirect("login");
      }
    });
  });
};
exports.delet = (req, res) => { };
