const Model = require("./model");

module.exports = class Offre extends Model {
  static tablename = "offres";
  constructor(id) {
    super();
    this.tablename = "offres";
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
  static getById = (Id_entrepold) => {
    return new Promise((resolve, reject) => {
      this.dbconnection.query(`SELECT * from ${this.tablename} where Id_entrepold = ${Id_entrepold}`, (error, results, fields) => {
        if (error) return reject(error)
        resolve(results)
      })
    })
  }

};

