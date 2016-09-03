/**
 * Created by CHOI on 2016-09-03.
 */
var express = require('express');
var mysql = require('mysql');
var router = express.Router();
var connection=null;
var count;

function init() {
    connection = mysql.createConnection({
        //host : '211.253.28.111',
        host : '127.0.0.1',
        user : 'root',
        password : '506030',
        database : 'linkmon'
    });
    connection.commit();
}


router.post('/', function(req, res) {
    console.log(req.body)

    var email = req.param('email');


    init();
    connection.query('SELECT * from user where email = "'+email+'"', function (err, rows, field) {

        if (rows.length == 0) {

            res.statusCode = 500;
            res.send(JSON.stringify({success: false}));

        }
        else {

            res.send(rows);

        }



        connection.end();
    });
});

module.exports = router;