var express = require('express');
var router = express.Router();
var mate = require('../node_modules/meta/index');

/* GET home page. */
router.get('/', function(req, res, next) {
    var client = new mate("http://jobkoreausa.com/m/work/employ_detail.html?no=16779", {timeout :5000});


    client.on("fetch", function(){


        console.log("Description: " + client.keywords['image']);

        res.send(client.images[1] + "- " + client.image);
    });

    client.on("error", function(err){


    });

    client.fetch();


});

module.exports = router;
