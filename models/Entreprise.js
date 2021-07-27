const Model = require("./model")



module.exports = class Entreprise extends Model {
    static tablename = 'entreprises'
    constructor(id) {
        this.id = id
    }

    static getAll = () => {
        return new Promise((resolve, reject) => {
            this.dbconnection.query(`SELECT * from ${this.tablename}`, (error, results, fields) => {
                if (error) return reject(error)
                resolve(results)
            })
        })
    }

<<<<<<< HEAD
    static getById = (Id_entreprise) => {
        console.log(10)
        return new Promise((resolve, reject) => {
            console.log(11)
            this.dbconnection.query(`SELECT * from ${this.tablename} where Id_utilisateur = ${Id_entreprise}`, (error, results, fields) => {
                if (error) return reject(error)
                resolve(results[0])
            })
        })
    }
=======
>>>>>>> a941e87487106cb9d1f6a779fd035ea2daf702ee


<<<<<<< HEAD
    update = () => {
        return new Promise((resolve, reject) => {
            console.log('id', this.Id_utilisateur)
            this.dbconnection.query(`UPDATE ${this.tablename} SET Raison_social = ?, Secteur_activite = ?, Site_web = ?, Localite = ?, Description = ? where Id_utilisateur = ${this.Id_utilisateur}`, [this.Raison_social, this.Secteur_activite, this.Site_web, this.Localite, this.Description], (error, results, fields) => {
                if (error) return reject(error)
                resolve(results)
            })
        })
    }

    static delet(Id_entreprise) {
        return new Promise((resolve, reject) => {
            this.dbconnection.query(`DELETE FROM ${this.tablename} where Id_utilisateur = ${Id_entreprise}`, (error, results, fields) => {
                if (error) return reject(error)
                resolve(results)
            })
        })
    }
=======
>>>>>>> a941e87487106cb9d1f6a779fd035ea2daf702ee


}