/**
 * Created by chaos on 2016-09-23.
 */
var express = require('express');
var path = require('path');
var dbconfig = require('../dbconn');
var mysql = require('mysql');
var connection;
connection = mysql.createConnection(dbconfig);
var router = express.Router();


router.get('/',function(req,res){
    if(req.session.user_id)
        res.redirect('/');
    res.render('./accounts/login.html');
});

router.get('/join',function(req,res){
    if(req.session.user_id)
        res.redirect('/');
    res.set({
        'Content-Type':'text/html',
        'charset':'utf-8'
    });
    res.render('./accounts/join.html');
});

router.post('/join',function(req,res){
    var user = {
        'user_id' : req.body.user_id,
        'user_pwd' : req.body.user_pwd,
        'username' : req.body.username,
        'addr' : req.body.addr,
        'phonenum' : req.body.phonenum
    }
    console.log("join test");
    var query = connection.query('INSERT into user set ?',user,function(err, result){
        if(err){
            console.log(err);
            throw err;
        }
        console.log(query);
    });
    res.status(200).send("200");
});

router.get('/login/', function(req,res){
    res.redirect('/accounts');
});

router.post('/login',function(req,res){
    var sess = req.session;

    var query = connection.query('SELECT user_pwd from user where user_id=' + mysql.escape(req.body.user_id), function (err, rows) {
        try {
            if (req.body.user_pwd === rows[0].user_pwd) {
                sess.user_id = req.body.user_id;
                sess.user_pwd = rows[0].user_pwd;
                res.send('success');
            }
            else {
                res.send('incorrect');
            }
            connection.release();
        }
        catch (err){
            if(rows[0] == null){
                console.log('undefined');
            }
            connection.release();
            res.redirect('/accounts');
        }
    });
});

router.get('/logout',function(req,res){
    var sess = req.session;
        if(sess.user_id){
            req.session.destroy(function(err){
                if(err) {
                    console.log(err);
                }
                else
                    res.redirect('/');
            })
        }
        else
            res.redirect('/');
});

module.exports = router;