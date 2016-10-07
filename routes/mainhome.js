
var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET users listing. */
router.get('/',function(req,res){
    var sess = req.session.user_id;
    res.render('layout.html',{
        user_id : sess,
        frame :'./partial/main',
        search_frame : './partial/search_popup'
    });
});

module.exports = router;