const Model = require("./model")

module.exports = class Etudiant extends Model {
    static tablename = 'etudold'
    constructor(id) {
        super();
        this.tablename = 'etudold';
        if (id) {
            this._id = id;
        }
    }
    create() { }
    read() { }
    update() { }
    delet() { }

    static getAll = () => {
        return new Promise((resolve, reject) => {
            this.dbconnection.query(`SELECT * from ${this.tablename}`, (error, results, fields) => {
                if (error) return reject(error)
                resolve(results)
            })
        })
    }
    static getById = (Id_etudold) => {
        return new Promise((resolve, reject) => {
            this.dbconnection.query(`SELECT * from ${this.tablename} where Id_etudold = ${Id_etudold}`, (error, results, fields) => {
                if (error) return reject(error)
                resolve(results)
            })
        })
    }

}