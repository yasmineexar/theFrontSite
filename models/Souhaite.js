const Model = require("./model");
module.exports = class Offre extends Model {
  static tablename = "souhaite";
  constructor(id) {
    super();
    this.tablename = "souhaite";
    if (id) {
      this._id = id;
    }
  }
  static getByIdUser(id) {
    return new Promise((resolve, reject) => {
      this.dbconnection.query(
        `SELECT * from ${this.tablename} where Id_utilisateur = ?`,
        [id],
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
        `INSERT INTO ${this.tablename} SET Id_utilisateur = ?,Id_offre = ?`,
        [this.Id_utilisateur, this.Id_offre],
        (error, results, fields) => {
          if (error) return reject(error);
          resolve(results);
        }
      );
    });
  }
  static delete(id_utilisateur,id_offre){
    return new Promise((resolve, reject) => {
      this.dbconnection.query(
        `delete from ${this.tablename} where Id_utilisateur = ? and Id_offre = ?`,
        [id_utilisateur, id_offre],
        (error, results, fields) => {
          if (error) return reject(error);
          resolve(results);
        }
      );
    });
  }
};
