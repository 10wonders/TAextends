var express = require('express');
var path = require('path');
var app = express();
var router = express.Router();
var fs = require('fs');

/* GET home page. */

router.get('/', function(req, res) {
    res.set({
        'Content-Type':'text/html',
        'charset':'utf-8'
    });
    res.sendFile(path.join(__dirname, '../views', 'main.html'));
});

router.post('/',function(request, response){
    console.log(request.body.title);
    console.log(request.body.editor1);
    fs.writeFile(path.join(__dirname,'../public/USER/raw_content','content.txt'),request.body.editor1,function(err){
        if(err) throw err;
        console.log('File Write ERr');
    })
    response.redirect('/');
})

module.exports = router;
