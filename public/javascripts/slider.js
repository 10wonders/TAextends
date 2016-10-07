$( "#search_submit" ).hover(function() {
    $( "#search_popup_wrap" ).addClass("mouseover");
},
    function () {
    });

$( "#search_popup_wrap" ).mouseleave(
    function () {
        console.log("leave");
        $( "#search_popup_wrap" ).removeClass("mouseover");
    });

var usedlist_amt = 10;   // 움직임 값 (클수록 빠름)
var usedlist_gap = 130;  // 이미지와 사이 공간의 합

var usedlist_cnt = 0;
var usedlist_init_amt = usedlist_amt;

function scroll_right(){
    console.log('right');
    document.getElementById('usedmall_item_list').scrollLeft += usedlist_amt;
    if(usedlist_cnt >= usedlist_gap){
        usedlist_cnt = 0;
        var adj = document.getElementById('usedmall_item_list').scrollLeft % usedlist_gap;
        document.getElementById('usedmall_item_list').scrollLeft -= adj;
        usedlist_amt = usedlist_init_amt;
    }
    else{
        usedlist_amt = Math.ceil(usedlist_amt / 1.2);
        setTimeout(scroll_right, 10);
    }
    usedlist_cnt = usedlist_cnt + usedlist_amt;
}

function scroll_left(){
    document.getElementById('usedmall_item_list').scrollLeft -= usedlist_amt;
    if(usedlist_cnt >= usedlist_gap){
        usedlist_cnt = 0;
        var adj = document.getElementById('usedmall_item_list').scrollLeft % usedlist_gap;
        if(adj > 0) adj = usedlist_gap - adj
        document.getElementById('usedmall_item_list').scrollLeft += adj;
        usedlist_amt = usedlist_init_amt;
    }
    else{
        usedlist_amt = Math.ceil(usedlist_amt / 1.2);
        setTimeout(scroll_left, 10);
    }
    usedlist_cnt = usedlist_cnt + usedlist_amt;
}

var shoppinglist_amt = 10;   // 움직임 값 (클수록 빠름)
var shoppinglist_gap = 120;  // 이미지와 사이 공간의 합

var shoppinglist_cnt = 0;
var shoppinglist_init_amt = shoppinglist_amt;

function scroll_down(){
    document.getElementById('shopping_item_list').scrollTop += shoppinglist_amt;
    if(shoppinglist_cnt >= shoppinglist_gap){
        shoppinglist_cnt = 0;
        var adj = document.getElementById('shopping_item_list').scrollTop % shoppinglist_gap;
        document.getElementById('shopping_item_list').scrollTop -= adj;
        shoppinglist_amt = shoppinglist_init_amt;
    }
    else{
        shoppinglist_amt = Math.ceil(shoppinglist_amt / 1.2);
        setTimeout(scroll_down, 10);
    }
    shoppinglist_cnt = shoppinglist_cnt + shoppinglist_amt;
}

function scroll_up(){
    document.getElementById('shopping_item_list').scrollTop -= shoppinglist_amt;
    if(shoppinglist_cnt >= shoppinglist_gap){
        shoppinglist_cnt = 0;
        var adj = document.getElementById('shopping_item_list').scrollTop % shoppinglist_gap;
        if(adj > 0) adj = shoppinglist_gap - adj
        document.getElementById('shopping_item_list').scrollTop += adj;
        shoppinglist_amt = shoppinglist_init_amt;
    }
    else{
        shoppinglist_amt = Math.ceil(shoppinglist_amt / 1.2);
        setTimeout(scroll_up, 10);
    }
    shoppinglist_cnt = shoppinglist_cnt + shoppinglist_amt;
}

/*
var amt = 10;   // 움직임 값 (클수록 빠름)
var gap = 100;  // 이미지와 사이 공간의 합

var cnt = 0;
var init_amt = amt;

function scroll_right(){
    document.getElementById('shopping_item_list').scrollTop += amt;
    if(cnt >= gap){
        cnt = 0;
        var adj = document.getElementById('shopping_item_list').scrollTop % gap;
        document.getElementById('shopping_item_list').scrollTop -= adj;
        amt = init_amt;
    }
    else{
        amt = Math.ceil(amt / 1.2);
        setTimeout(scroll_right, 10);
    }
    cnt = cnt + amt;
}

function scroll_left(){
    document.getElementById('shopping_item_list').scrollTop -= amt;
    if(cnt >= gap){
        cnt = 0;
        var adj = document.getElementById('shopping_item_list').scrollTop % gap;
        if(adj > 0) adj = gap - adj
        document.getElementById('shopping_item_list').scrollTop += adj;
        amt = init_amt;
    }
    else{
        amt = Math.ceil(amt / 1.2);
        setTimeout(scroll_left, 10);
    }
    cnt = cnt + amt;
}*/