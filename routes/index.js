var express = require('express');
var path = require('path');
var app = express();
var router = express.Router();
var fs = require('fs');

/* download image from remote url */
var request = require('request');

var download = function(uri, filename, callback){
    request.head(uri, function(err, res, body){
        console.log('content-type',res.headers['content-type']);
        console.log('content-length',res.headers['content-length']);
        request(uri).pipe(fs.createWriteStream("public/USER/images/"+filename)).on('close', callback);
    });
}

router.get('/', function(req, res) {
    res.set({
        'Content-Type':'text/html',
        'charset':'utf-8'
    });
    res.render('main.html');
});

router.post('/',function(req, res){
    console.log("posttest");
    var title = req.body.title;
    var content = req.body.editor1;
    var urlregax = /(http(s)?)(:\/\/)?(www\.)?[a-zA-Z0-9-_\.]+([-a-zA-Z0-9:%_\+.~#?&//=]*)?(.(jpg|png|jpeg|gif|bmp))([-a-zA-Z0-9:;%_\+.~#?&//=]*)?/g;
    var url = content.match(urlregax);
    console.log(url);

    //k == board index
    var k = 0;

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

    //make directories
    fs.mkdirSync('./public/USER/'+k, 0666);
    fs.mkdirSync('./public/USER/'+k+'/raw_content',0666);
    fs.mkdirSync('./public/USER/'+k+'/images',0666);

    //check for url pregmatch
    //if exist download from remote url
    if(url == null)
        console.log("no url");
    else {
        for (var i = 0; i < url.length; i++) {
            download(url[i], i + ".png", function () {
            })
            content = content.replace(url[i], '/USER/' + k + '/images/' + i + '.png');
        }
    }

    //save content
    var saveobject = {
        title : title,
        content : content
    }
    fs.writeFileSync('./public/USER/'+k+'/raw_content/content.txt',
                                    JSON.stringify(saveobject),'utf8',function(err){
        if(err)
            console.log("file err");
    })

    //save board index
    fs.writeFileSync('./public/USER/index.txt',k,'utf8', function(err){
        if(err)
            console.log("writing index file err");
    })

    //redirect to home
    res.redirect('/');
})

module.exports = router;
