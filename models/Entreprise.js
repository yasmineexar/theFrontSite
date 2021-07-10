const Model = require("./model")

module.exports = class Entreprise extends Model {

    static tablename = 'entrepold'
    constructor(id) {
        super();
        this.tablename = 'entrepold';
        if (id) {
            this._id = id;
        }
    }

    static getAll = () => {
        return new Promise((resolve, reject) => {
            this.dbconnection.query(`SELECT * from ${this.tablename}`, (error, results, fields) => {
                if (error) return reject(error)
                resolve(results)
            })
        })
    }

    static getById = (Id_entrepold) => {
        return new Promise((resolve, reject) => {
            this.dbconnection.query(`SELECT * from ${this.tablename} where Id_entrepold = ${Id_entrepold}`, (error, results, fields) => {
                if (error) return reject(error)
                resolve(results)
            })
        })
    }

    creat = () => {
        console.log(8)
        return new Promise((resolve, reject) => {
            console.log('5')

            this.dbconnection.query(`INSERT INTO ${this.tablename} SET Raison_social = ?, Secteur_activite = ?, Site_web = ?, Localite = ?, Description = ?`, [this.Raison_social, this.Secteur_activite, this.Site_web, this.Localite, this.Description], (error, results, fields) => {
                console.log('6')

                if (error) return reject(error)
                resolve(results)
                console.log('7')

            })
        })
    }
}