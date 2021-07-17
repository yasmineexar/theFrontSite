const Model = require("./model")
const User = require('./User')
module.exports = class Entreprise extends User {
    static tablename = 'entreprises'
    constructor(id) {
        super();
        this.tablename = 'entreprises';
        if (id) {
            this._id = id;
        }
    }

    static getAll = () => {
        return new Promise((resolve, reject) => {
            this.dbconnection.query(`SELECT * from entrepold`, (error, results, fields) => {
                if (error) return reject(error)
                resolve(results)
            })
        })
    }

    static getById = (Id_entrepold) => {
        return new Promise((resolve, reject) => {
            this.dbconnection.query(`SELECT * from entrepold where Id_entrepold = ${Id_entrepold}`, (error, results, fields) => {
                if (error) return reject(error)
                resolve(results)
            })
        })
    }

    creat = () => {
        return new Promise((resolve, reject) => {
            this.dbconnection.query(`INSERT INTO entrepold SET Raison_social = ?, Secteur_activite = ?, Site_web = ?, Localite = ?, Description = ?`, [this.Raison_social, this.Secteur_activite, this.Site_web, this.Localite, this.Description], (error, results, fields) => {
                if (error) return reject(error)
                resolve(results)
            })
        })
    }

    update = (Id_entrepold) => {
        return new Promise((resolve, reject) => {
            this.dbconnection.query(`UPDATE entrepold SET Raison_social = ?, Secteur_activite = ?, Site_web = ?, Localite = ?, Description = ? where Id_entrepold = ${Id_entrepold}`, [this.Raison_social, this.Secteur_activite, this.Site_web, this.Localite, this.Description], (error, results, fields) => {
                if (error) return reject(error)
                resolve(results)
            })
        })
    }

    static delet(Id_entrepold) {
        return new Promise((resolve, reject) => {
            this.dbconnection.query(`DELETE FROM entrepold where Id_entrepold = ${Id_entrepold}`, (error, results, fields) => {
                if (error) return reject(error)
                resolve(results)
            })
        })
    }

    //creer un compte entreprise
    createcompte = () => {
        return new Promise((resolve, reject) => {
            console.log('avant query select matricule')
            this.dbconnection.query(`SELECT * FROM entrepold WHERE Raison_social = '${this.Raison_social}'`, (error, results, fields) => {
                if (error) return reject(error)
                resolve(results)
                results = results[0]
                console.log(results)
                this.Logo = results.Logo
                this.Secteur_activite = results.Secteur_activite
                this.Localite = results.Localite
                this.Nb_stagiere_acceptes = results.Nb_stagiere_acceptes
                this.Site_web = results.Site_web
                this.Description = results.Description

                let user = new User()
                user.nom = this.nom
                user.prenom = this.prenom
                user.email = this.email
                user.username = this.username
                user.password = this.password
                user.role = 'entreprise'
                console.log(user.role)
                console.log("---------------")
                console.log(user.nom, user.prenom, user.username)
                user.create().then((id) => {
                    console.log('aw yedkhol f create tae etudiants')
                    this.Id_utilisateur = id
                    console.log(this.Id_utilisateur)
                    this.dbconnection.query(`INSERT INTO ${this.tablename} SET Nom = ?, Prenom = ?, Username = ?, Password = ?, Id_utilisateur = ?, Email = ?, Raison_social = ?, Description = ?, Site_web = ?, Nb_stagiere_acceptes = ?, Localite	 = ?, Secteur_activite = ?, Role = ?, Logo = ?`, [user.nom, user.prenom, user.username, user.password, id, this.email, this.Raison_social, this.Description, this.Site_web, this.Nb_stagiere_acceptes, this.Localite, this.Secteur_activite, user.role, this.Logo], (error, results, fields) => {
                        console.log('aw ydir la requete')
                        if (error) {
                            reject(error);
                            console.log(error)
                        }
                        resolve(results)
                    })
                }).catch((e) => {
                    reject(e)
                })
            })
        })
    }
}