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
  res.render('layout.html',{
    board_data:{},
      frame : './partial/board_view'
  });
});


router.get('/:k/', function(req, res, next) {
  var k = req.params.k;
    fs.readFile('./public/USER/'+k+'/raw_content/content.txt', 'utf-8',function(err,data){
      if(err) {
          console.log("file err");
          res.redirect("/")
      }
      else {
          var obj = JSON.parse(data);
          res.render('layout.html', {
              frame : './partial/board_view',
              board_data: obj
          });
      }
    });
});

module.exports = router;
