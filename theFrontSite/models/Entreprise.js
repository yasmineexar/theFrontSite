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





}