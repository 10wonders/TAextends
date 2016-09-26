var express = require('express');
var path = require('path');
var mysql = require('mysql');
var dbconfig = require('../dbconn');
var router = express.Router();
var fs = require('fs');

var connection = mysql.createConnection(dbconfig);

/* download image from remote url */
var request = require('request');

var download = function(uri, filename, k, callback){
    request.head(uri, function(err, res, body){
        console.log('content-type',res.headers['content-type']);
        console.log('content-length',res.headers['content-length']);
        request(uri).pipe(fs.createWriteStream("public/USER/"+k+"/images/"+filename)).on('close', callback);
    });
}

router.get('/', function(req, res) {
    var sess = req.session;
    res.set({
        'Content-Type':'text/html',
        'charset':'utf-8'
    });
    res.render('layout.html',{
       frame : './partial/editor'
    });
});

router.post('/',function(req, res){
    console.log("posttest");
    var title = req.body.title;
    var author = req.body.author;
    var content = req.body.editor1;
    var urlregax = /(http(s)?)(:\/\/)?(www\.)?[a-zA-Z0-9-_\.]+([-a-zA-Z0-9:%_\+.~#?&//=]*)?(.(jpg|png|jpeg|gif|bmp))([-a-zA-Z0-9:;%_\+.~#?&//=]*)?/g;
    var url = content.match(urlregax);
    console.log(url);

    //k == board index
    var k = 0;
    var board = {
        title : title,
        author : author,
        content : content,
        author_id : 1
    };

    //writing board index information
    //not exist -> make
    try{
        k = fs.readFileSync('./public/USER/index.txt')
    } catch (err){
        if(err.code === 'ENOENT'){
            fs.writeFileSync('./public/USER/index.txt',k,'utf8', function(err){
                if(err) throw err;
                console.log('board index file creted');
            })
        }
    }
    console.log("datak :"+k);
    k++;
    //check for url pregmatch
    //if exist download from remote url
    if(url == null)
        console.log("no url");
    else {
        for (var i = 0; i < url.length; i++) {
            download(url[i], i + ".png", k,function () {
            })
            content = content.replace(url[i], '/USER/' + k + '/images/' + i + '.png');
        }
    }
    connection.query('INSERT into board set ?',board,function(err,result){
        if(err){
            console.log(err);
            throw err;
        }
    });

    //make directories
    fs.mkdirSync('./public/USER/'+k, 0666);
    fs.mkdirSync('./public/USER/'+k+'/images',0666);

    //save board index
    fs.writeFileSync('./public/USER/index.txt',k,'utf8', function(err){
        if(err)
            console.log("writing index file err");
    })

    //redirect to home
    res.redirect('/');
})

module.exports = router;
