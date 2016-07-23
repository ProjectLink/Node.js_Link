var express = require('express');
var mysql = require('mysql');

var mate = require('../node_modules/meta/index');
var crypto = require('crypto');
var router = express.Router();

var connection = mysql.createConnection({
    host : '211.253.28.111',
    user : 'root',
    password : '506030',
    database : 'linkmon'
});

connection.commit();


router.post('/', function(req, res, next) {
    var email = req.param('email');
    var folder_name = req.param('folder_name');


    connection.query('SELECT * from link_list where email = "' + email + '" and folder_name = "'+ folder_name+'" ORDER BY createday DESC', function (err, rows, field) {

        console.log(email + folder_name);
        if (rows.length == 0) {

            res.send(JSON.stringify({success: false}));

        }
        else {

            res.send(rows);

        }


    });
});

router.post('/add', function(req, res, next) {
    var title = req.param('title');
    var content = req.param("content");
    var links = req.param("links");
    var email = req.param("email");
    var folder_name = req.param("folder_name");
    var createday = req.param("day");
    var image ;

    var client = new mate(links, {timeout :5000});


    client.on("fetch", function(){

        if(client.image == undefined) {
            image = "http://imgur.com/a/txbwW";
        } else {
            image = client.image;
        }

        var link = {
            'image': image,
            'title': title,
            'content': content,
            'link': links,
            'email': email,
            'folder_name': folder_name,
            'createday': createday
        };



        connection.query('SELECT * from link_list where email = "' + email + '" and link = "' + links + '" and folder_name = "'+ folder_name+ '"', function (err, rows, field) {
            if (err) {
                console.error(err);
                throw err;
            }

            if (rows.length == 0) {

                connection.query('insert into link_list set ?', link, function (error, result) {
                    if (error) {
                        console.error(error);
                        throw error;
                    }
                    res.send(JSON.stringify({success: true}));
                });

            }
            else {

                res.send(JSON.stringify({success: false,
                    messgae : "중복된 링크"}));

            }

        });



    });

    client.on("error", function(err){

        image = "http://imgur.com/a/txbwW";

        var link = {
            'image': image,
            'title': title,
            'content': content,
            'link': links,
            'email': email,
            'folder_name': folder_name,
            'createday': createday
        };



        connection.query('SELECT * from link_list where email = "' + email + '" and link = "' + links + '" and folder_name = "'+ folder_name+ '"', function (err, rows, field) {
            if (err) {
                console.error(err);
                throw err;
            }

            if (rows.length == 0) {

                connection.query('insert into link_list set ?', link, function (error, result) {
                    if (error) {
                        console.error(error);
                        throw error;
                    }
                    res.send(JSON.stringify({success: true}));
                });

            }
            else {

                res.send(JSON.stringify({success: false,
                    messgae : "중복된 링크"}));

            }

        });


    });

    client.fetch();



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
    var name = req.param('name');


    var user = {
        'title': name,
        'count': 0,
        'email': email
    };

    connection.query('SELECT * from link_folder where title = "' + name + '" and email = "' + email + '"', function (err, rows, field) {
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
