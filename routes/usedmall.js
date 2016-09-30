/**
 * Created by chaos on 2016-09-29.
 */

var express = require('express');
var router = express.Router();
var cc = require('../crawler');

var c_num = -1;

router.get('/', function(req,res){
   res.send('show list');
});


var hm_category=["신발, 가방, 잡화", "휴대폰", "여성의류", "남성의류", "유아동, 출산", "뷰티", "컴퓨터, 주변기기", "디지털, 가전",
                    "스포츠, 레저", "카메라", "가구", "리빙", "CD, DVD", "도서, 문구", "티켓", "음향기기, 악기", "게임", "예술, 미술",
                    "골동품, 희귀품", "애완", "부동산", "재능, 서비스", "포장식품", "기타"];

router.get('/hellomarket/search',function(req,res){
    var q = req.query.q;
    console.log(q);
    cc.hellomarket_item_search(c_num,q,function(result){
        res.render('layout.html',{
            category_name : [],
            items : result,
            user_id : req.session.user_id,
            frame : './partial/item_list'
        })
    });
});

router.get('/hellomarket',function(req,res){
    res.render('layout.html',{
        category : hm_category,
        user_id:req.session.user_id,
        frame:'./partial/hellomarket'
    });
});

router.get('/hellomarket/:k',function(req,res){
    c_num = req.params.k;
    cc.hellomarket(c_num,function(result){
        res.render('layout.html',{
            category_name : hm_category[c_num],
            items : result,
            user_id : req.session.user_id,
            frame : './partial/item_list'
        });
    });
});

router.get('/hellomarket/item/:k',function(req,res){
   var i_num = req.params.k;
    cc.hellomarket_item(i_num, function(result){
        console.log(result);
        res.render('layout.html',{
            item_info : result,
            user_id: req.session.user_id,
            frame:'./partial/item_view'
        })
    })
});



module.exports = router;
