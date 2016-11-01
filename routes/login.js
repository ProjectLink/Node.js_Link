var express = require('express');
var mysql = require('mysql');


var crypto = require('crypto');
var router = express.Router();
var connection=null;


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

/* GET users listing. */
router.post('/', function(req, res, next) {
  var email = req.param('email');
  var password = req.param('password');

  var mypass = crypto.createHash('sha512').update(password).digest('hex');

  init();
  connection.query('SELECT * from user where email = "' + email +'" and password = "' + mypass+ '"', function (err, rows, field) {



    if(!err) {
      if (rows.length == 0) {

        res.statusCode = 500;
        res.send(JSON.stringify({ success : false }) );

        }
      else {

        res.send(JSON.stringify({ success : true }) );

      }

    } else {
      res.send(err);
    }
    connection.end();

  });


});
module.exports = router;
