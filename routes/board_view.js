var express = require('express');
var path = require('path');
var router = express.Router();
var fs = require('fs');

/* GET users listing. */
router.get('/',function(req,res,next){
  res.set({
    'Content-Type':'text/html',
    'charset':'utf-8'
  });
  res.sendFile(path.join(__dirname, '../views', 'board_view.html'));
});


router.get('/1', function(req, res, next) {
  var data_path = path.join(__dirname,'../public/USER/raw_content','content.txt');
  var responsebody;
    fs.readFile(data_path, 'utf-8',function(err,data){
      if(err) throw err
        responsebody = {
          board_data : data
        };
      res.write(JSON.stringify(responsebody));
    });


  res.end();
});

module.exports = router;
