var express = require('express');
var mysql = require('mysql');


var crypto = require('crypto');
var router = express.Router();

var connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '506030',
    database : 'links'
});

connection.commit();


router.post('/', function(req, res, next) {
    var email = req.param('email');
    var folder_name = req.param('folder_name');


    connection.query('SELECT * from link_list where email = "' + email + '" and folder_name = "'+ folder_name+'"', function (err, rows, field) {

        console.log(email + folder_name);
        if (rows.length == 0) {

            res.send(JSON.stringify({success: false}));

        }
        else {

            res.send(rows);

        }


    });
});


/* GET users listing. */
router.post('/folder', function(req, res, next) {
    var email = req.param('email');


    connection.query('SELECT * from link_folder where email = "' + email + '"', function (err, rows, field) {


            if (rows.length == 0) {

                res.send(JSON.stringify({success: false}));

            }
            else {

                res.send(rows);

            }


    });
});


/* GET users listing. */
router.post('/folder/add', function(req, res, next) {
    var email = req.param('email');
    var name = req.param('name')


    var user = {
        'title': name,
        'count': 0,
        'email': email
    };

    connection.query('SELECT * from link_folder where title = "' + name + '" and email = "' + name + '"', function (err, rows, field) {
        if (err) {
            console.error(err);
            throw err;
        }

        if (rows.length == 0) {

            connection.query('insert into link_folder set ?', user, function (error, result) {
                if (error) {
                    console.error(error);
                    throw error;
                }
                res.send(JSON.stringify({success: true}));
            });

        }
        else {

            res.send(JSON.stringify({success: false}));

        }

    });
});




    module.exports = router;
