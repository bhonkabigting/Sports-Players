const mysql = require('mysql');
const config = require('../config/main');

class Database {
  constructor() {
    this.connection = mysql.createConnection(config.database);
    this.connection.connect((err) => {
      if (err) {
        console.error('error connecting: ' + err.stack);
        return;
      }
    });
  }

  getConnection() {
    return this.connection;
  }
}

module.exports = new Database().getConnection();
