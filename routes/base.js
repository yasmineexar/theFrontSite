const router = require("express").Router();
const { login } = require("../Controllers/UserController");
const { create } = require("../controllers/EtudiantController");
const { isAuth } = require("../middelwares/Auth");
path = require('path')

router.get(
  "/login",
  (res, req, next) => {
    if (req.session?.currentuser.id) {
      if (
        req.session.currentuser.Role == "admin" ||
        req.session.currentuser.Role == "pilote"
      )
        return res.redirect("/home");
      if (req.session.currentuser.Role == "entreprise")
        return res.redirect("/etudiant");
      if (req.session.currentuser.Role == "etudiant")
        return res.redirect("/metier");
    }
    return next();
  },
  (req, res) => {
    return res.render("login/login-register");
  }
);
router.get(
  "/",
  (req, res, next) => {
    if (req.session.currentuser) return res.redirect('/login')
    next();
  },
  (req, res) => {
    return res.render("accueil/home");
  }
);

router.get("/logout", (req, res) => {
  req.session.currentuser = undefined;
  res.redirect("/login");
});
router.post(
  "/register",
  (req, res, next) => {
    if (req.session.currentuser) return res.redirect("/login");
    next();
  },
  create
);
router.get(
  "/register",
  (req, res, next) => {
    if (req.session.currentuser) return res.redirect("/login");
    next();
  },
  (req, res) => {
    return res.render("login/login-register", { right: true });
  }
);
router.get(
  "/home",
  (req, res, next) => {
    if (req.session?.currentuser?.Role == 'admin' || req.session?.currentuser?.Role == 'pilote') return next()
    return res.redirect('login')
  },
  (req, res) => {
    res.render("accueil/homepilote");
  }
);
router.post("/login", (req, res, next) => {
  if (req.session.currentuser) return res.redirect('/login')
  return next()
}, login);
module.exports = router;
