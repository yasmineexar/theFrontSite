//2592

const Model = require("./model");

module.exports = class Postulation extends Model {
  static tablename = "postule";

  constructor(Id_offre = undefined, Id_utilisateur = undefined) {
    super();
    this.tablename = "postule";
    if (Id_offre) this.Id_offre = Id_offre;
    if (Id_utilisateur) this.Id_utilisateur = Id_utilisateur;
  }
  static getByIdUser(Id_utilisateur) {
    return new Promise((resolve, reject) => {
      this.dbconnection.query(
        `SELECT * FROM ${this.tablename} where Id_utilisateur = ?`,
        [Id_utilisateur],
        (error, results, fields) => {
          if (error) return reject(error);
          resolve(results);
        }
      );
    });
  }
  create() {
    return new Promise((resolve, reject) => {
      this.dbconnection.query(
        `INSERT INTO postule(Id_utilisateur, Id_offre, Date_postulation, Etat) VALUES (?,?,?,?)`,
        [this.Id_utilisateur, this.Id_offre, this.Date_postulation, this.Etat],
        (error, results, fields) => {
          if (error) return reject(error);
          resolve(results);
        }
      );
    });
  }
  static read(Id_utilisateur, Id_offre) {
    return new Promise((resolve, reject) => {
      this.dbconnection.query(
        `SELECT * FROM ${this.tablename} where Id_utilisateur = ? and Id_offre = ?`,
        [Id_utilisateur, Id_offre],
        (error, results, fields) => {
          if (error) return reject(error);
          resolve(results);
        }
      );
    });
  }
  static getAll() {
    return new Promise((resolve, reject) => {
      this.dbconnection.query(
        `SELECT * FROM ${this.tablename} `,
        (error, results, fields) => {
          if (error) return reject(error);
          resolve(results);
        }
      );
    });
  }
  update() {
    return new Promise((resolve, reject) => {
      this.dbconnection.query(
        `update postule set Etat = ? where Id_utilisateur = ? and Id_offre = ? `,
        [this.Etat, this.Id_utilisateur, this.Id_offre],
        (error, results, fields) => {
          if (error) return reject(error);
          resolve(results);
        }
      );
    });
  }
  static delete(id_utilisateur, id_offre) {
    return new Promise((resolve, reject) => {
      this.dbconnection.query(
        `delete from postule where Id_utilisateur = ? and Id_offre = ? `,
        [id_utilisateur, id_offre],
        (error, results, fields) => {
          if (error) return reject(error);
          resolve(results);
        }
      );
    });
  }
};
