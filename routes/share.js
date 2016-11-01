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
        //host : '127.0.0.1',
        user : 'root',
        password : '506030',
        database : 'linkmon'
    });
    connection.commit();
}


router.get('/', function(req, res) {

    init();
    connection.query('SELECT * from link_share LEFT OUTER JOIN user ON user.id=link_share.id ORDER BY createdate DESC LIMIT 10', function (err, rows, field) {

        if (rows.length == 0) {

            res.statusCode = 500;
            res.send(JSON.stringify({success: false}));

        }
        else {
            var send = Array();

            for(var i=0; i<rows.length; i++) {
                send[i] = {
                    id: rows[i].id,
                    category: rows[i].category,
                    say: rows[i].say,
                    links: rows[i].links,
                    folders: rows[i].folders,
                    likes: rows[i].likes,
                    reply: rows[i].reply,
                    createdate: rows[i].createdate,
                    updateday: rows[i].updateday,
                    name: rows[i].name,
                    img: rows[i].img
                };

            }

            res.send(JSON.stringify(send));

        }



        connection.end();
    });
});


router.post('/links', function(req, res) {

    var type = req.query.type;

    var links = 0;
    var link = Array();

    var folder1 = null;
    var folder2 = null;
    var folder3 = null;

    var select = null;

    if(type == "link") {
        links = req.param("links");



        for(var i = 0; i < links; i++) {
            link.push(req.param("link"+(i+1)));
        }

        switch (links) {
            case 1:
                select = "SELECT * from link_list where id = "+link[0];
                break;

            case 2:
                select = "SELECT * from link_list where id = "+link[0] +" or id = " + link[1];
                break;

            case 3:
                select = "SELECT * from link_list where id = "+link[0] +" or id = " + link[1] + " or id = "+ link[2];
                break;
        }
    } else if(type == "folder") {

    }

    /*
     "id": 235,
     "image": null,
     "type": 0,
     "title": " 루리웹",
     "content": "개잼",
     "link": "ruliweb.com",
     "email": "com5090@naver.com",
     "folder_name": "gogs",
     "likes": 0,
     "replys": 0,
     "share": 0,
     "views": 0,
     "createdate": "2016-09-03T16:40:06.000Z",
     "updateday": null
     */


    init();
    connection.query(select, function (err, rows, field) {

        var send = Array();

        for(var i = 0; i< rows.length; i++) {
            send[i] = {
                id : rows[i].id,
                image : rows[i].image,
                title : rows[i].title,
                link : rows[i].link,
                share : rows[i].share
            }
        }

        res.send(send);

    });





});




router.post('/reply', function(req, res) {

    var share_id = req.param("share_id");


    init();
    connection.query("select * from link_share_reply LEFT OUTER JOIN user ON user.id=link_share_reply.user_id where share_id = "+ share_id + " ORDER BY createdate DESC LIMIT 10", function (err, rows, field) {

        var send = Array();

        for(var i = 0; i< rows.length; i++) {
            send[i] = {
                id : rows[i].id,
                image : rows[i].img,
                name : rows[i].name,
                say : rows[i].say,
                date : rows[i].createdate
            }
        }

        res.send(send);

    });





});

module.exports = router;