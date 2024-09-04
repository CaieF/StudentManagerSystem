var mysql = require('mysql2');
var db = mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'123456',
  database:'cms'
});

db.connect();

module.exports = db;