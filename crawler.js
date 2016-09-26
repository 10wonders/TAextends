/**
 * Created by chaos on 2016-09-09.
 */

var request = require("request");
var express = require("express");
var cheerio = require("cheerio");
var iconv =require("iconv-lite");

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

module.exports.hellomarket = function hellomarket_crawler() {
    var category_num = hm_category[0]+"0000";
    var pagenum = 1;
    var url = "https://www.hellomarket.com/search?category=" + category_num + "&page=" + pagenum;


    var item_title = new Array();
    var price = new Array();
    request(url, function (error, response, body) {
        if (error) throw error;
        var $ = cheerio.load(body);
        var imgurlregax = /(\/\/)(img\.)[a-zA-Z0-9-_\.]+([-a-zA-Z0-9:%_\+.~#?&//=]*)?(.(jpg|png|jpeg|gif|bmp))([-a-zA-Z0-9:;%_\+.~#?&//=]*)?/g;
        var imgurl = body.match(imgurlregax);
        var targeturlregax = /(\/item\/)[0-9]+/g
        var targeturl = body.match(targeturlregax, imgurlregax);

        var IList = $('#thumbnail').children('ul').children('li');

        for (var i = 0; i < IList.length; i++) {

            item_title[i] = $(IList[i]).find('.item_title').text();
            price[i] = $(IList[i]).find('.item_price').text();
            console.log(imgurl[i]);
            console.log(targeturl[i]);
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