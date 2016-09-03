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
        host : '211.253.28.111',
        //host : '127.0.0.1',
        user : 'root',
        password : '506030',
        database : 'linkmon'
    });
    connection.commit();
}


router.get('/', function(req, res) {

    init();
    connection.query('SELECT * from link_share JOIN user ON user.id=link_share.id ORDER BY createdate DESC ', function (err, rows, field) {

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

module.exports = router;