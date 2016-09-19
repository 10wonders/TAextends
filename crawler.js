/**
 * Created by chaos on 2016-09-09.
 */

var request = require("request");
var express = require("express");
var cheerio = require("cheerio");
var iconv =require("iconv-lite");




module.exports.hellomarket = function hellomarket_crawler() {
    var category_num = 'HAC0000';
    var pagenum = 1;
    var url = "https://www.hellomarket.com/search?category=" + category_num + "&page=" + pagenum;


    var item_title = new Array();
    var price = new Array();
    request(url, function (error, response, body) {
        if (error) throw error;
        var $ = cheerio.load(body);

        console.log($('#item_title').text());

        var IList = $('#thumbnail').children('ul').children('li');

        for (var i = 0; i < IList.length; i++) {
            item_title[i] = $(IList[i]).find('.item_title').text();
            price[i] = $(IList[i]).find('.item_price').text();
            console.log("아이템 이름 :" + item_title[i] + "가격 : " + price[i]);
        }
    });
}

module.exports.joongonara = function joongonara_crawler(){
    var menu_id = "339";
    var display_num = "50";
    var url = "http://cafe.naver.com/ArticleList.nhn?search.clubid=10050146&search.menuid=" + menu_id + "&search.boardtype=L&userDisplay=" + display_num;
    var item_title = new Array();
    var board_id = new Array();
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

            var IList = $(".board-box").children('tbody').children('tr');


            //중고나라 관련 크롤러 부분 개선 필요
            for (var i = 0; i < IList.length; i++) {
                item_title[i] = ($(IList[i]).find('.aaa').text());
                board_id[i] = ($(IList[i]).find('.list-count').text());
                console.log("아이템 이름 :" + item_title[i] + "게시판 번호 : " + board_id[i]);
            }
    });
}