
var express = require('express');
var path = require('path');
var router = express.Router();
var fs = require('fs');

/* GET users listing. */
router.get('/',function(req,res){
    res.set({
        'Content-Type':'text/html',
        'charset':'utf-8'
    });
    res.render('login.html');
});