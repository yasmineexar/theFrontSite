const Model = require("./model");

module.exports = class Metier extends Model {
  static tablename = "metiers";
  constructor(id) {
    super();
    this.tablename = "metiers";
    if (id) {
      this._id = id;
    }
  }
  static getAll() {
    return new Promise((resolve, reject) => {
      this.dbconnection.query(`SELECT * from ${this.tablename}`, (error, results, fields) => {
        if (error) return reject(error)
        resolve(results)
      })
    })
  }
  static getById(Id_metier) {
    return new Promise((resolve, reject) => {
      this.dbconnection.query(`SELECT * from ${this.tablename} where Id_metier = ${Id_metier} `, (error, results, fields) => {
        if (error) return reject(error)
        resolve(results)
      })
    })
  }
  creat = () => {
    return new Promise((resolve, reject) => {
      this.dbconnection.query(`INSERT INTO ${this.tablename} SET Description = ?, Image = ?, Nom = ?, Id_faculte = ?`, [this.Description, this.Image, this.Nom, this.Id_faculte], (error, results, fields) => {
        if (error) return reject(error)
        resolve(results)
      })
    })
  }
  update = () => {
    return new Promise((resolve, reject) => {
      this.dbconnection.query(`UPDATE ${this.tablename} SET Description = ?, Image = ?, Nom = ?, Id_faculte = ? where Id_metier = ${this.Id_metier}`, [this.Description, this.Image, this.Nom, this.Id_faculte], (error, results, fields) => {
        if (error) return reject(error)
        resolve(results)
      })
    })
  }
  static delet(Id_metier) {
    return new Promise((resolve, reject) => {
      this.dbconnection.query(`DELETE FROM ${this.tablename} where Id_metier = ${Id_metier}`, (error, results, fields) => {
        if (error) return reject(error)
        resolve(results)
      })
    })
  }

};

