
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

  static getAllPilote = () => {
    return new Promise((resolve, reject) => {
      this.dbconnection.query(`SELECT * from ${this.tablename} WHERE Role = 'pilote'`, (error, results, fields) => {
        if (error) return reject(error)
        resolve(results)
      })
    })
  }

  static getPiloteById = (Id_utilisateur) => {
    return new Promise((resolve, reject) => {
      this.dbconnection.query(`SELECT * from ${this.tablename} WHERE Role = 'pilote' AND Id_utilisateur =${Id_utilisateur}`, (error, results, fields) => {
        if (error) return reject(error)
        resolve(results)
      })
    })
  }

  create = () => {
    return new Promise((resolve, reject) => {
      this.dbconnection.query(`INSERT INTO ${this.tablename} SET Nom = ?, Prenom = ?, Email = ?, Username = ?, Password = ?, Role = ?`, [this.Nom, this.Prenom, this.Email, this.Username, this.Password, this.Role], (error, results, fields) => {
        if (error) return reject(error)
        resolve(results)
      })
    })
  }

  update() { }

  delete() { }
};

