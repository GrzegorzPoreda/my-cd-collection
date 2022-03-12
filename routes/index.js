var express = require('express');
var router = express.Router();

const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'root',
  database: 'cdcollection'
});

db.connect();

router.get('/', (req,res) => {
  const sql = 'SELECT COUNT(*) AS albumsCount FROM Albumy;';
  db.query(sql, (error, data) => {
    if (error) {
      console.log(error);
    }
    res.render('index', {numberOfAlbums: data[0].albumsCount});
  });
});

module.exports = router;
