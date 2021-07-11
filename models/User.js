
const Model = require("./model");

module.exports = class User extends Model {
  static tablename = "utilisateur";
  constructor(id) {
    super();
    this.tablename = "utilisateur";
    if (id) {
      this._id = id;
    }
  }
  create = () => {
    return new Promise((resolve, reject) => {
      this.dbconnection.query(`INSERT INTO ${this.tablename} SET Nom = ?, Prenom = ?, Email = ?, Username = ?, Password = ?, Role = ?`, [this.Nom, this.Prenom, this.Email, this.Username, this.Password, this.Role], (error, results, fields) => {
        if (error) return reject(error)
        resolve(results)
      })
    })
  }
  read() { }
  update() { }
  delete() { }
  static getAllPilote = () => {
    return new Promise((resolve, reject) => {
      this.dbconnection.query(`SELECT * from ${this.tablename} WHERE ROLE = 'pilote'`, (error, results, fields) => {
        if (error) return reject(error)
        resolve(results)
      })
    })
  }

};

