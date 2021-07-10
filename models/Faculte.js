
const Model = require("./model");

module.exports = class Faculte extends Model {
  static tablename = "faculte";
  constructor(id) {
    super();
    this.tablename = "faculte";
    if (id) {
      this._id = id;
    }
  }
  creat() { }
  update() { }
  delete() { }
  read() { }
  static getAll() {
    return new Promise((resolve, reject) => {
      this.dbconnection.query(`SELECT * from ${this.tablename}`, (error, results, fields) => {
        if (error) return reject(error)
        resolve(results)
      })
    })
  }
  static getById = (Id_faculte) => {
    return new Promise((resolve, reject) => {
      this.dbconnection.query(`SELECT * from ${this.tablename} where Id_faculte = ${Id_faculte}`, (error, results, fields) => {
        if (error) return reject(error)
        resolve(results)
      })
    })
  }
};

