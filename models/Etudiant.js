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
                u.create().then((id) => {
                    this.Id_utilisateur = id
                    console.log('Id_utilisateur: ', this.Id_utilisateur)
                    this.dbconnection.query(`INSERT INTO ${this.tablename} SET Nom = ?, Prenom = ?, Username = ?, Password = ?, Id_utilisateur = ?, Email = ?, Annee_etude = ?, Date_naissance = ?, Adresse = ?, Num_tel = ?, Id_faculte = ?, Specialite = ?, Role = ?, Matricule = ?, Cv = ?`, [u.nom, u.prenom, u.username, u.password, this.Id_utilisateur, this.email, this.annee_etude, this.date_naissance, this.adresse, this.num_tel, this.Id_faculte, this.specialite, u.role, this.matricule, this.cv], (error, results, fields) => {
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

    search() {
        return new Promise((resolve, reject) => {
            this.dbconnection.query(`SELECT * FROM etudold WHERE Nom LIKE ?`, ['%' + this.searchNom + '%'], (error, results, fields) => {
                if (error) return reject(error)
                resolve(results)
                console.log(results)
            })
        })
    }
    update() { }
    delet() { }
    static selectwhere = (a) => {
        let cond = ''
        if (a && Object.entries(a).some(e => e[1] !== '')) {
            cond = cond.concat('where ')
            Object.entries(a).forEach((entrie, i) => {
                if (entrie[1] !== '') {
                    cond = cond.concat(entrie[0] + '="' + entrie[1] + '"')
                    if (Object.entries(a).length != i) cond.concat(' and ')
                }
            });
        }
        console.log(`select * from etudold ${cond}`)
        return new Promise((resolve, reject) => {
            this.dbconnection.query(`select * from etudold ${cond}`, (err, fields, results) => {
                if (err) reject(err)
                resolve(fields)
            })
        })
    }
    static getAll = () => {
        return new Promise((resolve, reject) => {
            this.dbconnection.query(`SELECT * from ${this.tablename}`, (error, results, fields) => {
                if (error) return reject(error)
                resolve(results)
            })
        })
    }
    static getById = (Id_etudiant) => {
        return new Promise((resolve, reject) => {
            this.dbconnection.query(`SELECT * from ${this.tablename} where Id_utilisateur = ${Id_etudiant}`, (error, results, fields) => {
                if (error) return reject(error)
                resolve(results[0])
            })
        })
    }

}