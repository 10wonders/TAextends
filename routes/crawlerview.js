/**
 * Created by chaos on 2016-09-09.
 */
var request = require("request");
var express = require("express");
var cheerio = require("cheerio");
var cc = require("../crawler");
var fs = require("fs");
var router = express.Router();

router.get('/',function(req, res, next){
    cc.joongonara();
    res.redirect("/");
});


module.exports = router;