
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
  create() { }
  read() { }
  update() { }
  delete() { }
  static getAll() { }

};

