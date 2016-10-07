/**
 * Created by chaos on 2016-09-09.
 */

var request = require("request");
var express = require("express");
var cheerio = require("cheerio");
var iconv =require("iconv-lite");
var urlencode = require("urlencode");

/*
 * Hellomarket Category
 * HAC0000 = 신발, 가방, 잡화
 * HAK0000 = 휴대폰
 * HAA0000 = 여성의류
 * HAB0000 = 남성의류
 * HAE0000 = 유아동, 출산
 * HAD0000 = 뷰티
 * HAI0000 = 컴퓨터, 주변기기
 * HAH0000 = 디지털, 가전
 * HAO0000 = 스포츠, 레저
 * HAJ0000 = 카메라
 * HAF0000 = 가구
 * HAG0000 = 리빙
 * HAL0000 = CD, DVD
 * HAP0000 = 도서, 문구
 * HAQ0000 = 티켓
 * HAM0000 = 음향기기, 악기
 * HAN0000 = 게임
 * HAS0000 = 예술, 미술
 * HAT0000 = 골동품, 희귀품
 * HEA0000 = 애완
 * HCA0000 = 부동산
 * HDA0000 = 재능, 서비스
 * HAU0000 = 포장식품
 * HZZ0000 = 기타
 */

var hm_category=["HAC", "HAK", "HAA","HAB", "HAE","HAD","HAI","HAH","HAO", "HAJ", "HAF","HAG", "HAL", "HAP", "HAQ","HAM","HAN","HAS","HAT","HEA","HCA","HDA","HAU","HZZ"];

module.exports.hellomarket_search = function hellomarket_search(query, callback){

};

//헬로마켓 아이템 크롤러
module.exports.hellomarket_item = function hellomarket_item_crawler(item_num,callback){
    var url = "https://www.hellomarket.com/item/"+item_num;
    request(url,function(error, response, body){
        if(error) throw error;
        var $ = cheerio.load(body);
        var imgurlregax=/(\/\/)(img\.)[a-zA-Z0-9-_\.]+([-a-zA-Z0-9:%_\+.~#?&//=]*)?(.(jpg|png|jpeg|gif|bmp))([-a-zA-Z0-9:;%_\+.~#?&//=]*)?/g;
  //      var imgurl = body.match(imgurlregax);

        var uList = $('.thumbnail-wrapper').children('.badeagle').children('.centered');
        var IList = $('.item_info');
        var CList = $('.description');
        var imgurl = [];
        for(var i=0;i<uList.length;i++) {
            imgurl[i] = $(uList[i]).find('.thumbnailImg').attr('src');
        }

        var item_title = $(IList).find('.item_title').text();
        var item_price = $(IList).find('.item_price').text();
        var description = $(CList).find('.description_text').text();

        var result = {
            img_url : imgurl,
            title : item_title,
            price : item_price,
            des : description
        };
        callback(result);
    });
};

// 헬로 마켓 카테고리 별
module.exports.hellomarket = function hellomarket_crawler(category_num, callback) {
    var category = hm_category[category_num]+"0000";
    var pagenum = 1;
    var url = "https://www.hellomarket.com/search?category=" + category + "&page=" + pagenum;


    var item_title = [];
    var price = [];
    request(url, function (error, response, body) {
        if (error) throw error;
        var $ = cheerio.load(body);

        var imgurlregax = /(\/\/)(img\.)[a-zA-Z0-9-_\.]+([-a-zA-Z0-9:%_\+.~#?&//=]*)?(.(jpg|png|jpeg|gif|bmp))([-a-zA-Z0-9:;%_\+.~#?&//=]*)?/g;
        var imgurl = body.match(imgurlregax);

        var targeturlregax = /(\/item\/)[0-9]+/g;
        var targeturl = body.match(targeturlregax, imgurlregax);

        var IList = $('#thumbnail').children('ul').children('li');

        for (var i = 0; i < IList.length; i++) {
            item_title[i] = $(IList[i]).find('.item_title').text();
            price[i] = $(IList[i]).find('.item_price').text();
//            console.log(imgurl[i]);
//            console.log(targeturl[i]);
//            console.log("아이템 이름 :" + item_title[i] + "가격 : " + price[i]);
        }
        var result = {
            img_url : imgurl,
            url : targeturl,
            title : item_title,
            price : price
        };
        callback(result);
    });
};

//헬로마켓 검색 쿼리 
module.exports.hellomarket_item_search = function hellomarket_item_search(category_num, query, callback) {
    var category = hm_category[category_num]+"0000";
    var pagenum = 1;
    query = urlencode(query);
    var url = "https://www.hellomarket.com/search?q="+query+ "&page=" + pagenum;
    if(category_num!=-1)
        url += "&category="+hm_category[category_num]+"0000";

    console.log(url);
    var item_title = [];
    var price = [];
    request(url, function (error, response, body) {
        if (error) throw error;
        var $ = cheerio.load(body);
        var imgurlregax = /(\/\/)(img\.)[a-zA-Z0-9-_\.]+([-a-zA-Z0-9:%_\+.~#?&//=]*)?(.(jpg|png|jpeg|gif|bmp))([-a-zA-Z0-9:;%_\+.~#?&//=]*)?/g;
        var imgurl = body.match(imgurlregax);
        var targeturlregax = /(\/item\/)[0-9]+/g;
        var targeturl = body.match(targeturlregax, imgurlregax);

        var IList = $('#thumbnail').children('ul').children('li');

        for (var i = 0; i < IList.length; i++) {
            item_title[i] = $(IList[i]).find('.item_title').text();
            price[i] = $(IList[i]).find('.item_price').text();
//            console.log(imgurl[i]);
//            console.log(targeturl[i]);
//            console.log("아이템 이름 :" + item_title[i] + "가격 : " + price[i]);
        }
        var result = {
            img_url : imgurl,
            url : targeturl,
            title : item_title,
            price : price
        };
        callback(result);
    });
};

//중고나라 크롤러 - item_title&&board_id
module.exports.joongonara = function joongonara_crawler(){
    var menu_id = "353";
    var display_num = "50";
    var url = "http://cafe.naver.com/ArticleList.nhn?search.clubid=10050146&search.menuid=" + menu_id + "&search.boardtype=L&userDisplay=" + display_num;
    var item_title = [];
    var board_id = [];
    var item_url = [];
    request.get({
        url:url,
        encoding:null
        },
        function (error, response, body) {
            if (error) throw error;

            //중고나라 encoding 문제 설정
            var strcontents = iconv.decode(body, 'KS_C_5601');
            body = iconv.encode(strcontents, 'utf-8');
            var $ = cheerio.load(body);
            var IList = $(".list-count");
            var tList = $(".board-list").children("span").children("span");

            if(IList == null)
                console.log("not detected");

            for (var i = 0; i < IList.length; i++) {
                board_id[i] = ($(IList[i]).text());
                item_title[i] = ($(tList[i]).find("a").text());
                item_url[i] = $(tList[i]).find("a").attr("href");
                console.log("아이템 이름 :" + item_title[i] + "게시글 번호 : " + board_id[i]);
                console.log(item_url[i]);
            }
    });
};

module.exports.joongonara_boarditem = function joongonara_boarditem(board_id, callback) {
    var url = "http://cafe.naver.com/joonggonara";
    var t_url = url + ".cafe?iframe_url=/joonggonara/ArticleRead.nhn%3Farticleid=339606683%26clubid=10050146";
    url = "http://www.naver.com";
    var n_config = require('./nLogin');
    var path = require('path');
    var phantom = require('node-phantom-simple');
    console.log(require('phantomjs').path);
    phantom.create({ path : require('phantomjs').path },function(err,ph){
        console.log("create");
        return ph.createPage(function(err,page){
            console.log("createPage");
            return page.open(url, function(err,status){
                console.log("opend sites", status);
                page.evaluate(function(){
                    document.getElementById("id").value = n_config.id;
                    document.getElementById("pw").value = n_config.password;
                    confirm_submit();

                    return document.title;
                }, function(err, result){
                    console.log(result);
                });
                setTimeout(function(){
                    console.log(t_url);
                    return page.open(t_url, function(err,status){

                        if(status == 'success'){
                            console.log('success');
                            return page.evaluate(function(){
                                return document.getElementById("cafe_main").contentWindow.document.body.innerHTML;
                            }, function(err, result){
                                console.log(result);
                                var $ = cheerio.load(result);
                                var pItem = $('.comm-detail');
                                var IList = $('.details-m');
                                var imgurl = $(pItem[0]).find("img").attr("src");
                                var title = $(IList[0]).find(".title").text();
                                var price = $(IList[0]).find(".price").text();
                                console.log(title+" : "+price);
                            });

                        }else{
                            console.log("err");
                        }
                        return ph.exit();
                    });
                }, 2000);
            })
        })
    });

    request.get({
        url : url,
        encoding : null
    },function (error, response, body) {
        if (error) throw error;


        console.log("tte");
        //중고나라 encoding 문제 설정
    });
};


//get joonggonara category name and url
module.exports.joongonara_category = function joongonara_category(){
    var url = "http://cafe.naver.com/joonggonara";
    var category_title = [];
    var category_url = [];
    request.get({
            url:url,
            encoding:null
        },
        function (error, response, body) {
            if (error) throw error;

            //중고나라 encoding 문제 설정
            var strcontents = iconv.decode(body, 'KS_C_5601');
            body = iconv.encode(strcontents, 'utf-8');
            var $ = cheerio.load(body);

            var IList = $(".cafe-menu-list").children('li');


            //중고나라 관련 크롤러 부분 개선 필요
            for (var i = 0; i < IList.length; i++) {
                category_title[i] = ($(IList[i]).find('.gm-tcol-c').text());
                var c_url = ($(IList[i]).find('.gm-tcol-c')).attr("href");
                c_url = c_url.match(/menuid=([0-9]*)/g);
                category_url[i]  = c_url;

                console.log(category_title[i] + " : " + category_url[i]);
            }
    });
}

module.exports.bunjang = function bunjang_crawler(category_num, callback) {
    var category = "310";
    var pagenum = 0;
    var url = "http://m.bunjang.co.kr/categories/" + category + "?page=" + pagenum;

    var img_url = [];
    var item_title = [];
    var price = [];

    request(url, function (error, response, body) {
        console.log('resuest');
        if (error) throw error;
        var $ = cheerio.load(body);
        console.log($('.goodslist').children('li').children('.thumb'));
        // var imgurlregax = /(\/\/)(img\.)[a-zA-Z0-9-_\.]+([-a-zA-Z0-9:%_\+.~#?&//=]*)?(.(jpg|png|jpeg|gif|bmp))([-a-zA-Z0-9:;%_\+.~#?&//=]*)?/g;
        // var imgurl = body.match(imgurlregax);
        // var targeturlregax = /(\/item\/)[0-9]+/g;
        // var targeturl = body.match(targeturlregax, imgurlregax);

        var IList = $('.goodslist').chilodren('li').children('.thumb');
        console.log(IList.length);
        for (var i = 0; i < IList.length; i++) {
            img_url[i] =$(IList[i]).find('.thumb.loaded').attr('data-src');
            item_title[i] = $(IList[i]).find('.txtinfo>em').text();
            price[i] = $(IList[i]).find('.textinfo>strong').text();
            console.log(imgurl[i]);
           console.log(targeturl[i]);
           console.log("아이템 이름 :" + item_title[i] + "가격 : " + price[i]);
        }
        var result = {
            img_url : img_url,
            //url : targeturl,
            title : item_title,
            price : price
        };
        callback(result);
    });
};