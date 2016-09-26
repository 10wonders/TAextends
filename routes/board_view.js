var express = require('express');
var path = require('path');
var router = express.Router();
var fs = require('fs');
var mysql = require('mysql');
var dbconfig = require('../dbconn');

var connection = mysql.createConnection(dbconfig);


/* GET users listing. */
router.get('/',function(req,res){
    connection.query("SELECT * from board", function(err, rows){
        console.log("query");
        if(rows[0]==null){
            console.log("no board data");
            var board_list = {};
        }
        else {
            console.log("data inputing");
            board_list = rows;
            console.log(board_list);
        }
        res.render('layout.html',{
            board_data : board_list,
            user_id : req.session.user_id,
            frame : './partial/board_list'
        });
    });
});


router.get('/:k/', function(req, res, next) {
    var k = req.params.k;
    connection.query("SELECT * from board where id="+k,function(err,rows){
        console.log(rows);
        if(rows[0]==null)
            res.redirect("/board_view");
        else
            res.render('layout.html', {
                user_id: req.session.user_id,
                frame:'./partial/board_view',
                board_data:rows
            });
    });
});

module.exports = router;
