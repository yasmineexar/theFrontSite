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
  create() { }
  read() { }
  update() { }
  delet() { }

  static getAll() {
    return new Promise((resolve, reject) => {
      this.dbconnection.query(`SELECT * from ${this.tablename}`, (error, results, fields) => {
        if (error) return reject(error)
        resolve(results)
      })
    })
  }

};

