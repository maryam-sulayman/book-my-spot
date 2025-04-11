const mysql = require('mysql2');
const { dbConfig } = require('./config');

const db = mysql.createConnection(dbConfig);

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

module.exports = db;