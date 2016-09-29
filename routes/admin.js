/**
 * Created by chaos on 2016-09-29.
 */
var express = require('express');
var router = express.Router();


router.get('/',function(req,res,next){
   res.render('layout.html',{
       user_id : req.session.user_id,
       frame : './partial/admin_view'
   });
});

module.exports =  router;