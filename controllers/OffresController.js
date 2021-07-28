const Offre = require("../Models/Offre");
const Entreprise = require("../models/Entreprise");
const Faculte = require("../Models/Faculte");
const Wish = require("../models/Souhaite");
const Postulation = require("../models/Postulation");
const Etudiant = require("../models/etudiant");

exports.addtowish = (req, res) => {
  if (req.body.Id_offre && req.session.currentuser.Role == "etudiant") {
    let wish = new Wish();
    wish.Id_utilisateur = req.session.currentuser.id;
    wish.Id_offre = req.body.Id_offre;
    wish
      .create()
      .then(() => {
        res.send("ok");
      })
      .catch((e) => console.log(e));
  }
};

exports.read = (req, res) => {
  if (req.query.json) {
    return Offre.getAll().then((offres) => {
      let c = [];
      Wish.getByIdUser(req.session.currentuser.id).then((wish) => {
        //console.log("postulation: ", wish);
        offres.forEach((element, i) => {
          if (wish.find((e) => e.Id_offre == element.Id_offre)) offres[i].isWish = true;

          // console.log(p)
          c.push(
            Postulation.read(req.session.currentuser.id, element.Id_offre).then(results => {
              if (results && results.length == 1) offres[i].postulationstate = results[0].Etat
            })
          )
          c.push(
            Entreprise.getById(element.Id_utilisateur).then((entr) => {
              offres[i].Entreprise = entr;
            })
          );
        });
        // console.log(offres);
        Promise.all(c).then(() => {
          if (req.session.currentuser.Role == 'etudiant') return Etudiant.getById(req.session.currentuser.id).then(et => {
            offres = offres.filter(e => e.Id_faculte == et.Id_faculte)
            return res.json(offres);
          })
          return res.json(offres);
        });
      });
    });
  }
  return res.render("offres/all");
};
exports.add = (req, res) => {
  Faculte.getAll().then((rows) => {
    return res.render("offres/add", { faculte: rows });
  });
};
exports.creat = (req, res) => {
  let offre = new Offre();
  offre.Duree_stage = req.body.Duree_stage;
  offre.Id_utilisateur = req.session.currentuser.id;
  offre.Base_remuneration = req.body.Base_remuneration;
  offre.Nb_places = req.body.Nb_places;
  offre.Description = req.body.Description;
  offre.Titre = req.body.Titre;
  offre.Id_faculte = req.body.Id_faculte;
  if (
    req.body.Description == "" ||
    req.body.Nom == "" ||
    req.body.Id_faculte == ""
  )
    req.session.message = {
      type: "danger",
      intro: "Champs vides!",
      message: "Veuillez insérer les informations requises.",
    };
  else if (req.body.Nom == "jsp")
    req.session.message = {
      type: "warning",
      intro: "Ce métier existe déja!",
      message: "Veuillez insérer de nouvelles informations.",
    };
  else {
    offre.creat();
    req.session.message = {
      type: "success",
      intro: "Succés !",
      message: "Une nouvelle offre a bien été créé.",
    };
    return res.redirect("add");
  }
};
exports.edit = (req, res) => {
  Promise.all([Offre.getById(req.params.id), Faculte.getAll()]).then((a) => {
    offre = a[0];
    facultes = a[1];
    return res.render("offres/edit", { offre: offre[0], facultes });
  });
};
exports.update = (req, res) => {
  let o = new Offre();
  Offre.getById(req.params.id).then((offre) => {
    if (offre.Id_ustilisateur != req.session.currentuser.id)
      return res.status(403).send("unauthorized");
    o.Id_offre = req.params.id;
    o.Base_remuneration = req.body.Base_remuneration || offre.Base_remuneration;
    o.Duree_stage = req.body.Duree_stage || offre.Duree_stage;
    o.Description = req.body.Description || offre.Description;
    o.Id_faculte = req.body.Id_faculte || offre.Id_faculte;
    o.Nb_places = req.body.Nb_places || offre.Nb_places;
    o.Titre = req.body.Titre || offre.Titre;
    if (
      req.body.Description == "" ||
      req.body.Nom == "" ||
      req.body.Id_faculte == ""
    ) {
      req.session.message = {
        type: "danger",
        intro: "Champs vides !",
        message: "Veuillez insérer les informations requises.",
      };
    } else {
      o.update().then(() => {
        req.session.message = {
          type: "success",
          intro: "Succés !",
          message: "Offre a bien été modifié.",
        };
        res.redirect("/offre/edit/" + req.params.id);
      });
    }
  });
};
exports.delet = (req, res) => {
  Offre.getById(req.params.id).then((offre) => {
    if (req.session.currentuser.id != offre.Id_ustilisateur)
      return res.status(403).send("unautorized");
    return Offre.delet(req.params.id).then(() => {
      req.session.message = {
        type: "success",
        intro: "Succés !",
        message: "Offre a bien été supprimé.",
      };
      return res.redirect("/offre");
    });
  });
};


exports.deletewish =(req,res)=>{
  Wish.delete(req.session.currentuser.id,req.params.id).then(()=>res.send('ok'))
}