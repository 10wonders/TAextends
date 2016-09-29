/**
 * Created by chaos on 2016-09-29.
 */
var express = require('express');
var router = express.Router();
var cc = require('../crawler');

router.get('/',function(req,res,next){
    cc.hellomarket(1,function(result){
        console.log(result.img_url[1]);
        res.render('layout.html',{
            items : result,
            user_id : req.session.user_id,
            frame : './partial/item_list'
        });
    });
});

module.exports = router;