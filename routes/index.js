var express = require('express');
var router = express.Router();
var mate = require('../node_modules/meta/index');

/* GET home page. */
router.get('/', function(req, res, next) {

  var client = new mate("https://www.npmjs.com/search?q=cheerio", {timeout :5000});


  var test;

  client.on("fetch", function(){
  test = client.image;

    res.render('index', { title: test });
  });

  client.on("error", function(err){
    console.log(err);
  });

  client.fetch();

  console.log(test);
});

module.exports = router;
