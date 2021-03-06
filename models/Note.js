
const Model = require("./model");

module.exports = class Note extends Model {
  static tablename = "note";
  constructor(id) {
    super();
    this.tablename = "note";
    if (id) {
      this._id = id;
    }
  }
  create() {
    return new Promise((resolve, reject) => {
      this.dbconnection.query(`INSERT INTO ${this.tablename}  (Id_utilisateur, 	Id_utilisateur_Etudiants, Note, Commentaire) VALUES (?, ?, ?, ?)`, [this.Id_utilisateur, this.Id_etudiant, this.Note, this.Commentaire], (error, results, fields) => {
        if (error) return reject(error)
        this.dbconnection.query(`UPDATE postule SET Etat = 'terminer' WHERE Id_utilisateur = ?`, [this.Id_etudiant], (error, results) => {
          if (error) return reject(error)
          resolve(results)
        })
      })
    })
  }
  read() { }

  static getByUser(Id_utilisateur) {
    return new Promise((resolve, reject) => {
      this.dbconnection.query(`SELECT * FROM ${this.tablename} WHERE Id_utilisateur_Etudiants = ?`, [Id_utilisateur], (error, results, fields) => {
        if (error) return reject(error)
        resolve(results[0])
      })
    })
  }

};

