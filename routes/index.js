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
    for(var i = 0;i<url.length;i++)
    {
        download(url[i],i+".png",function(){
        })
        content = content.replace(url[i],'/USER/images/'+i+'.png');
    }
    var saveobject = {
        title : title,
        content : content
    }
    fs.writeFile(path.join(__dirname,'../public/USER/raw_content','content.txt'),
                                    JSON.stringify(saveobject),function(err){
        if(err)
            console.log("file err");
    })
    res.redirect('/');
})

module.exports = router;
