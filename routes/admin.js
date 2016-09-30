/**
 * Created by chaos on 2016-09-29.
 */
var express = require('express');
var router = express.Router();
var dbconfig = require('../dbconn');
var mysql = require('mysql');
var connection = mysql.createConnection(dbconfig);
var fs = require('fs');

router.get('/',function(req,res,next){
    connection.query("SELECT * from board", function(err, rows){
        console.log("query");
        var board = rows;
        if(board[0]==null){
            console.log("no board data");
            var board_list = {};
        }
        else {
            console.log("data inputing");
            board_list = board;
            //    console.log(board_list);
        }
        res.render('layout.html',{
            board_data : board_list,
            user_id : req.session.user_id,
            frame : './partial/board_list'
        });
    });

});


/* delete board data */
router.get('/:k/del', function(req,res){
    var k = req.params.k;
    connection.query("delete from board where id="+k,function(err, rows){
        if(err) {
            res.send('<script>alert("삭제 실패");'+
                'document.location.href="/board";</script>');
        }
        else
            res.send('<script>alert("삭제 성공");'+
            'document.location.href="/board";</script>');
    });
});

/* read board data */
router.get('/:k',function(req,res){
    var k = req.params.k;
    connection.query("SELECT * from board where id="+k,function(err,rows){
        console.log(rows);
        if(rows!=undefined) {
            fs.readdir('./public/USER/' + rows[0].id + "/images", function (err, files) {
                console.log(files.length);
                if (rows[0] == null)
                    res.redirect("/board_view");
                else
                    res.render('layout.html', {
                        img_arr: files,
                        user_id: req.session.user_id,
                        frame: './partial/admin_view',
                        board_data: rows
                    });
            });
        }
        else {
            var files = [];
            res.render('layout.html', {
                img_arr: files,
                user_id: req.session.user_id,
                frame: './partial/admin_view',
                board_data: rows
            });
        }
    });
});

module.exports =  router;