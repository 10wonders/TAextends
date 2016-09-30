
/*function RollImage(json){
 this.current_img = 0;
 this.next_img = 1;

 this.list_area = e(json.list_area);
 this.image_list = this.list_area.getElementsByTagName("DIV");
 this.img_cnt = this.image_list.length-1;
 this.roll_time = json.roll_time;
 this.move_time = json.move_time;
 this.coord_x1 = 0;
 this.coord_x2 = this.list_area.offsetWidth;
 this.moveAt = json.moveAt;

 setRoll(this);
 }
 //이미지 롤링 기본 세팅하기
 function setRoll(o){
 o.coord_x1 = 0;
 o.coord_x2 = o.list_area.offsetWidth;


 o.image_list[o.next_img].style.display = "block";
 o.image_list[o.next_img].style.left = o.coord_x2+"px";

 setTimeout(function(){imgMove(o)},o.roll_time);
 }

 //이미지를 움직이게 한다.
 function imgMove(o){

 o.image_list[o.current_img].style.left = o.coord_x1 + "px";
 o.image_list[o.next_img].style.left = o.coord_x2 + "px";

 o.coord_x1 -= o.moveAt;
 o.coord_x2 -= o.moveAt;

 if(o.coord_x1 < (-1*o.list_area.offsetWidth) ) {
 o.current_img = o.next_img;
 o.next_img += 1;
 if(o.current_img == o.img_cnt) o.next_img = 0;
 clearTimeout(o.move_timer);
 o.roll_timer = setTimeout(function(){setRoll(o)},o.roll_time);
 return;
 }
 o.move_timer = setTimeout(function(){imgMove(o)},o.move_time);
 }
 */

function RollImage(json){
    //이미지 롤링 설정값
    var config = {
        currentImg : 0,
        nextImg : 1,
        listArea : e(json.list_area),
        imageList : e(json.list_area).getElementsByTagName("DIV"),
        imgCnt : e(json.list_area).getElementsByTagName("DIV").length-1, //0부터 시작
        rollTime : json.roll_time,
        moveTime : json.move_time,
        coordX1 : 0,
        coordX2 : e(json.list_area).offsetWidth,
        coordY : e(json.list_area).offsetHeight,
        moveAt : json.moveAt,
        direction : json.direction,
        label : e(json.label),
        labelType : json.labelType
    };

    labelBind(config); //라벨(버튼) 바인드
    setRoll(config); //롤링 시작
    rollPause(config); //마우스 오버시 롤링 멈춤

    //이미지 롤링 기본 세팅하기
    function setRoll(c){
        c.coordX1 = 0;
        c.coordX2 = c.listArea.offsetWidth;
        c.coordY = c.listArea.offsetHeight;

        if(c.direction=="right" || c.direction=="down"){
            c.coordX2 = c.coordX2 * -1;
            c.coordY = c.coordY * -1;
        }

        c.imageList[c.nextImg].style.display = "block";
        setPosition(c);
        rollOver(c)
        //c.imageList[c.nextImg].style.left = c.coordX2+"px";

        c.rollTimer = setTimeout(function(){imgMove(c)},c.rollTime);
    };

    //이미지를 움직이게 한다.
    function imgMove(c){
        if(c.direction == "left" || c.direction == "right"){
            c.imageList[c.currentImg].style.left = c.coordX1 + "px";
            c.imageList[c.nextImg].style.left = c.coordX2 + "px";
        }else if(c.direction == "up" || c.direction == "down"){
            c.imageList[c.currentImg].style.top = c.coordX1 + "px";
            c.imageList[c.nextImg].style.top = c.coordY + "px";
        }
        //alert(c.imageList[c.nextImg].style.left);
        var moveAt = parseInt(c.moveAt);
        if (c.direction == "left"){
            c.coordX1 -= moveAt;
            c.coordX2 -= moveAt;
        }else if(c.direction == "right"){
            c.coordX1 += moveAt;
            c.coordX2 += moveAt;
        }else if(c.direction=="up"){
            c.coordX1 -= moveAt;
            c.coordY -= moveAt;
        }else if(c.direction=="down"){
            c.coordX1 += moveAt;
            c.coordY += moveAt;
        }

        //if(c.coordX1 < (-1*c.listArea.offsetWidth) ) {
        if( isNextImgRoll(c) ) {
            c.currentImg = c.nextImg;
            c.nextImg += 1;
            if(c.currentImg == c.imgCnt) c.nextImg = 0;
            clearTimeout(c.moveTimer);
            clearTimeout(c.rollTimer);
            setRoll(c);
            return;
        }
        c.moveTimer = setTimeout(function(){imgMove(c)},c.moveTime);
    };

    //다음 이미지 롤링 해야하는지 확인
    function isNextImgRoll(c){
        var d = c.direction;
        if(d=="left" && c.coordX2 < 0 ) return true;
        else if(d=="right" && c.coordX2 > 0) return true;
        else if(d=="up" && c.coordY < 0 ) return true;
        else if(d=="down" && c.coordY > 0) return true;

        return false
    };

    //롤링 방향에 따른 두번째 이미지 위치 좌표 설정
    function setPosition(c){
        var d = c.direction;
        if(d=="left") c.imageList[c.nextImg].style.left = c.listArea.offsetWidth+"px";
        else if(d=="right") c.imageList[c.nextImg].style.left = (-1 * c.listArea.offsetWidth) + "px";
        else if(d=="up") c.imageList[c.nextImg].style.top = c.listArea.offsetHeight + "px";
        else if(d=="down") c.imageList[c.nextImg].style.top = (-1 * c.listArea.offsetHeight) + "px";

        //alert(c.imageList[c.nextImg].style.left);
    };
a
    //onmouseover 시 움직임 멈춤
    function rollPuse(c){
        //alert(c.listArea.onmouseover);
        c.listArea.onmouseover = function(){
            clearTimeout(c.rollTimer);
        }

        c.listArea.onmouseout = function(){
            //alert("c.listArea.onmouseout");
            setRoll(c);
        }
    };

    //라벨과 바인드
    function labelBind(c){
        if(c.label == null) return; //라벨을 사용하지 않으면 아래는 실행되지 않는다.
        var labels = c.label.getElementsByTagName(c.labelType);

        c.label.onmouseover = function(event){ //라벨영역에 마우스가 오면
            var evt = event || window.event;
            var t = evt.target || evt.srcElement;
            for(n in labels){
                if(labels[n] == t){
                    //c.imageList[c.currentImg].style.display = "none";
                    c.currentImg = parseInt(n);
                    c.nextImg = parseInt(n)+1;
                    if(c.currentImg == c.imgCnt) c.nextImg = 0;
                    clearTimeout(c.rollTimer);
                    viewImg(c);
                    rollOver(c);
                    break;
                }
            }
            //alert(event.srcElement)
        }

        c.label.onmouseout = function(event){
            var evt = event || window.event;
            var t = evt.target || evt.srcElement;
            for(n in labels){
                if(labels[n]==t){
                    setRoll(c);
                    break;
                }
            }
        }
    };

    //라벨 onmouseover 시 클래스 적용
    function rollOver(c){
        if(c.label == null) return;
        var els = c.label.getElementsByTagName(c.labelType);

        if(c.labelType == "img"){

            for(n in els){
                if(typeof els[n] == "object"){
                    if(n == c.currentImg){
                        els[n].src = els[n].getAttribute("oversrc");
                    }else{
                        els[n].src = els[n].getAttribute("outsrc");
                    }
                }
            }
        }else{
            for(n in els){
                if(typeof els[n] == "object"){
                    if(n == c.currentImg){
                        var ocss = els[n].className;
                        els[n].className = ocss+" "+els[n].getAttribute("overcss");
                    }else{
                        els[n].className = els[n].getAttribute("outcss");
                    }
                }
            }
        }
    }

    //라벨에서 선택된 이미지 보이기
    function viewImg(c){
        //alert(c.currentImg);
        for(n=0; n<c.imgCnt+1; n++)	{
            c.imageList[n].style.display = "none";
        }

        c.imageList[c.currentImg].style.left = "0px";
        c.imageList[c.currentImg].style.top = "0px";
        c.imageList[c.currentImg].style.display = "block";
    };
}

function debug(t){
    e("dis").innerHTML = t + "<br>";
}

//id값으로 객체 반환
function e(id){
    var o = document.getElementById(id);
    if(typeof o == undefined || o == null) { return null;}

    return o;
}

/* Created by wlghd on 2016-09-28. */
