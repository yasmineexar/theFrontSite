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

  static getAll = () => {
    return new Promise((resolve, reject) => {
      this.dbconnection.query(`SELECT * from ${this.tablename}`, (error, results, fields) => {
        if (error) return reject(error)
        resolve(results)
      })
    })
  }

  static getById = (Id_offre) => {
    return new Promise((resolve, reject) => {
      this.dbconnection.query(`SELECT * from ${this.tablename} where Id_offre = ${Id_offre}`, (error, results, fields) => {
        if (error) return reject(error)
        resolve(results)
      })
    })
  }

  /*  Get offres By Id_entrepold jsp si ca sera utile
      static getById = (Id_entrepold) => {
      return new Promise((resolve, reject) => {
        this.dbconnection.query(`SELECT * from ${this.tablename} where Id_entrepold = ${Id_entrepold}`, (error, results, fields) => {
          if (error) return reject(error)
          resolve(results)
        })
      })
    } */

  creat = () => {
    return new Promise((resolve, reject) => {
      this.dbconnection.query(`INSERT INTO ${this.tablename} SET Duree_stage = ?, Base_remuneration = ?, Nb_places = ?, Description = ?, Titre = ?, Id_faculte = ?`, [this.Duree_stage, this.Base_remuneration, this.Nb_places, this.Description, this.Titre, this.Id_faculte], (error, results, fields) => {
        if (error) return reject(error)
        resolve(results)
      })
    })
  }

  update = () => {
    return new Promise((resolve, reject) => {
      this.dbconnection.query(`UPDATE ${this.tablename} SET Duree_stage = ?, Base_remuneration = ?, Nb_places = ?, Description = ?, Titre = ?, Id_faculte = ? where Id_offre = ${this.Id_offre}`, [this.Duree_stage, this.Base_remuneration, this.Nb_places, this.Description, this.Titre, this.Id_faculte], (error, results, fields) => {
        if (error) return reject(error)
        resolve(results)
      })
    })
  }
  static delet = (Id_Offre) => {
    return new Promise((resolve, reject) => {
      this.dbconnection.query(`DELETE FROM ${this.tablename} WHERE Id_Offre = ${Id_Offre}`, (error, results, fields) => {
        if (error) return reject(error)
        resolve(results)
      })
    })
  }
};

