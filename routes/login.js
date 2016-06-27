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

  connection.query('SELECT * from user where email = "' + email +'" and password = "' + password+ '"', function (err, rows, field) {



    if(!err) {
      if(rows.length == 0) {

        res.send(JSON.stringify({ success : false }) );

        }
      else {

        res.send(JSON.stringify({ success : true }) );

      }

    } else {
      res.send(err);
    }

  });

});

module.exports = router;
