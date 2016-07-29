var express = require('express');
var mysql = require('mysql');
var crypto = require('crypto');
var router = express.Router();

var connection=null;


function init() {
    connection = mysql.createConnection({
        host : '211.253.28.111',
        user : 'root',
        password : '506030',
        database : 'linkmon'
    });
    connection.commit();
}

/* GET users listing. */
router.post('/', function(req, res, next) {
    var email = req.param('email');
    var password = req.param('password');
    var name = req.param("name");
    var gender = req.param('gender');
    var birtday = req.param('birtday');

    var mypass = crypto.createHash('sha512').update(password).digest('hex');

    
    
    
    var user = {'email':email,
        'password':mypass,
        'name':name,
        'gender':gender,
        'birtday':birtday
    };
    init();
    connection.query('SELECT * from user where email = "' + email +'"', function (err, rows, field) {
        if (err) {
            console.error(err);
            throw err;
        }

        if(rows.length == 0) {

            connection.query('insert into user set ?',user, function(error, result){
                if (error) {
                    console.error(error);
                    throw error;
                }
                res.send(JSON.stringify({ success : true }) );
            });

        }
        else {

            res.send(JSON.stringify({ success : false }) );

        }
        connection.end();

    });









});

router.post('/chk', function(req, res, next) {
    var email = req.param('email');





});
module.exports = router;

