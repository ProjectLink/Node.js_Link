var express = require('express');
var mysql = require('mysql');
var router = express.Router();

var connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '506030',
    database : 'links'
});

connection.commit();

/* GET users listing. */
router.post('/', function(req, res, next) {
    var email = req.param('email');
    var password = req.param('password');
    var nickname = req.param("nickname");
    var sex = req.param('sex');
    var day = req.param('day');

    connection.query('SELECT * from user where email = "' + email +'" and password = "' + password+ '"', function (err, rows, field) {



        if(!err) {
            if(rows.length == 0) {

                res.send(JSON.stringify({ success : false }) );

            }
            else {

                res.send(JSON.stringify({ success : true }) );

            }

        } else {
            res.send("로그인 실패");
        }
    });

});

module.exports = router;


/*
 var data = ['서울특별시 종로구',1];
 client.query('insert into local values(?,?)',data,  function(error, result){
 if(!error){
 console.log(result);
 }
 */