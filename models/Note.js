
const Model = require("./model");

module.exports = class Note extends Model {
  static tablename = "Note";
  constructor(id) {
    super();
    this.tablename= "Note";
    if (id) {
      this._id = id;
    }
  }
  create() {}
  read() {}
  update() {}
  delete() {}
  static getAll() {}
  
};

