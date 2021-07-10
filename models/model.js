const mysql = require('mysql')
module.exports = class Model {
    static dbconnection = mysql.createPool({
        connectionLimit: 10,
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'bddusthb'
    })
    constructor() {
        this.dbconnection = mysql.createPool({
            connectionLimit: 10,
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'bddusthb'
        })
    }


}