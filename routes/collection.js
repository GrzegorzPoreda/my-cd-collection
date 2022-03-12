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
    const sql = 'SELECT ID, Nazwa, Artysta, Rok_Wydania FROM Albumy;';
    db.query(sql, (error, data) => {
        if (error) {
            console.log(error);
        }
        res.render('collection', {data: data, enteredPhrase: ''});
    });
});

router.post('/', (req,res) => {
    var searchPhrase = req.body.searchPhrase;
    const sql = `SELECT Nazwa, Artysta, Rok_Wydania FROM Albumy WHERE  Nazwa LIKE '%${searchPhrase}%' 
                                                                    OR Artysta LIKE '%${searchPhrase}%' 
                                                                    OR Rok_Wydania LIKE '%${searchPhrase}%';`;
    db.query(sql, (error, data) => {
        if (error) {
            console.log(error);
        }
        res.render('collection', {data: data, enteredPhrase: searchPhrase});
    });
});

router.get('/album/:id', function(req, res, next) {
    var id = req.params.id;
    const sql = `SELECT * FROM Albumy WHERE ID = ${id};`;
    db.query(sql, (error, data) => {
        if (error) {
            console.log(error);
        }
        res.render('albumDetails', {data: data});
    });
});

router.get('/add', (req,res) => {
    res.render('newAlbum', {enteredTitle: '', enteredArtist: '', enteredYear: ''});
});

router.post('/add', (req,res) => {
    var title = req.body.title;
    var artist = req.body.artist;
    var year = req.body.year;
    const sql = `INSERT INTO Albumy (Nazwa, Artysta, Rok_Wydania) VALUES ('${title}', '${artist}', ${year});`;
    db.query(sql, (error, data) => {
        if (error) {
            console.log(error);
            res.render('newAlbum', {enteredTitle: title, enteredArtist: artist, enteredYear: year});
        } else {
            res.redirect('/collection');
        }
    });
});

router.get('/delete/:id', function(req, res, next) {
    var id = req.params.id;
    const sql = `DELETE FROM Albumy WHERE ID = ${id};`;
    console.log(sql);
    db.query(sql, (error, data) => {
        if (error) {
            console.log(error);
        }
        res.redirect('/collection');
    });
});

module.exports = router;