const Model = require("./model")
const User = require('./User')
module.exports = class Etudiant extends User {
    static tablename = 'etudiants'
    constructor(id) {
        super();
        this.tablename = 'etudiants';
        if (id) {
            this._id = id;
        }
    }

    create = () => {
        return new Promise((resolve, reject) => {
            console.log('avant query select matricule')
            this.dbconnection.query(`SELECT * FROM etudold WHERE matricule = '${this.matricule}'`, (error, results, fields) => {
                if (error) return reject(error)
                resolve(results)
                results = results[0]
                console.log(results)
                this.nom = results.Nom
                this.prenom = results.Prenom
                this.email = results.Email
                this.annee_etude = results.Annee_etude
                this.date_naissance = results.Date_naissance
                this.adresse = results.Adresse
                this.num_tel = results.Num_tel
                this.Id_faculte = results.Id_faculte
                this.specialite = results.Specialite
                console.log(this.nom, this.prenom)

                let u = new User()
                u.nom = this.nom
                u.prenom = this.prenom
                u.email = this.email
                u.username = this.username
                u.password = this.password
                u.role = "etudiant"
                console.log("---------------")
                console.log(u.nom, u.prenom, u.username)
                u.create().then((id) => {
                    console.log('aw yedkhol f create tae etudiants')
                    this.Id_utilisateur = id
                    console.log(this.Id_utilisateur)
                    this.dbconnection.query(`INSERT INTO ${this.tablename} SET Nom = ?, Prenom = ?, Username = ?, Password = ?, Id_utilisateur = ?, Email = ?, Annee_etude = ?, Date_naissance = ?, Adresse = ?, Num_tel = ?, Id_faculte = ?, Specialite = ?, Role = ?, Matricule = ?`, [u.nom, u.prenom, u.username, u.password, this.Id_utilisateur, this.email, this.annee_etude, this.date_naissance, this.adresse, this.num_tel, this.Id_faculte, this.specialite, u.role, this.matricule], (error, results, fields) => {
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

    read() { }
    update() { }
    delet() { }

    static getAll = () => {
        return new Promise((resolve, reject) => {
            this.dbconnection.query(`SELECT * from etudold`, (error, results, fields) => {
                if (error) return reject(error)
                resolve(results)
            })
        })
    }
    static getById = (Id_etudold) => {
        return new Promise((resolve, reject) => {
            this.dbconnection.query(`SELECT * from etudold where Id_etudold = ${Id_etudold}`, (error, results, fields) => {
                if (error) return reject(error)
                resolve(results)
            })
        })
    }

}