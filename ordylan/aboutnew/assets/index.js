$(document).ready(function(){
});

$(window).load(function(){
$('header, #cts, footer').css({'display':'block'});
resizeFunc();
ownFunc();
commonFunc();
resizeYT();
setTimeout(function() {todaysCookie();}, 1000);

});
	
$(window).resize(function() {
resizeFunc();
resizeYT();
});

function resizeFunc(){

var w = $(window).innerWidth();
var h = $(window).innerHeight();


if(w>=835){
//PC
$('.imgChange').each(function(){
			$(this).attr("src",$(this).attr("src").replace('_sp', '_pc')).css({visibility:'visible'});
});

}else{
//スマホ
$('.imgChange').each(function(){
			$(this).attr("src",$(this).attr("src").replace('_pc', '_sp')).css({visibility:'visible'});
});
}

//予告編win系
var playerW = w*0.9;
if(playerW > 1120){playerW = 1120;}
var playerH = playerW*9/16;
if(h<playerH){
playerH = h;
}

$('#player').css({'height':playerH,'margin-top':(h-playerH)/2,'margin-left':(w/2)-(playerW/2)});

}

function ownFunc(){

//オープニングV閉じる系イベント
$('#trWin, #trWin .popupClose').click(function(){
opYTend();
});


$(".inline").modaal({
	type: 'inline',	// コンテンツのタイプを指定
	animation_speed: '30', 	// アニメーションのスピードをミリ秒単位で指定
	//background: '#001567',	// 背景の色を白に変更
	overlay_opacity: '1.0',	// 背景のオーバーレイの透明度を変更
	before_open: function(e) { 
		resizeYT();
		openWin();
	} ,
	before_close: function(e) {
		closeWin();
　}  
});

//$(".inline").modaal('open');

$(".presentPopup").click(function () {
var w = $(window).innerWidth();
if(w>=835){
$(".modaal-container").css('max-width', 640);
}
});


//$('.modal').click(function(){
//  $('.inline').modaal('close');
//});

$("#ytWrap1 a").click(function () {
$("#ytWrap1 a").each(function(){
$(this).removeClass("ytNow");
});
$(this).addClass("ytNow");
});



var controller = new ScrollMagic();

var charaD = 0.3;
var mechaT = 1.5;

//動かしたい要素のアニメーションを作る
var tween_storyTTL = TweenMax.fromTo("#story", 1.2, {opacity:0, y:20} , {opacity:1, y:0, delay:0.5, ease:Power4.easeOut});

var tween_storyWrap = TweenMax.fromTo("#storyWrap", 1.2, {opacity:0, scale:0.8, y:0} , {opacity:1, scale:1, y:0, delay:0.8, ease:Power4.easeOut, onStart: function(){
TweenMax.fromTo("#mecha1", mechaT, {opacity:-1, scale:0.5, x:200, y:100} , {opacity:1, scale:1, x:0, y:0, delay:charaD, ease:Power4.easeOut});
TweenMax.fromTo("#mecha2", mechaT, {opacity:-1, scale:0.5, x:-200, y:100} , {opacity:1, scale:1, x:0, y:0, delay:charaD, ease:Power4.easeOut});
TweenMax.fromTo("#mecha3", mechaT, {opacity:-1, scale:0.5, x:200, y:50} , {opacity:1, scale:1, x:0, y:0, delay:charaD, ease:Power4.easeOut});
TweenMax.fromTo("#mecha4", mechaT, {opacity:-1, scale:0.5, x:-200, y:50} , {opacity:1, scale:1, x:0, y:0, delay:charaD, ease:Power4.easeOut});
}});


var tween_charaTTL = TweenMax.fromTo("#chara", 1.2, {opacity:0, y:20} , {opacity:1, y:0, delay:0.2, ease:Power4.easeOut});
var tween_charaPapi = TweenMax.fromTo("#charaPapi", 0.8, {opacity:0, scale:0.5, y:0} , {opacity:1, scale:1, y:0, delay:0.2, ease:Power4.easeOut});
var tween_charaRocoroco = TweenMax.fromTo("#charaRocoroco", 0.8, {opacity:0, scale:0.5, y:0} , {opacity:1, scale:1, y:0, delay:0.2, ease:Power4.easeOut});


//トリガーになる位置を指定してアニメーションを設定する
var scene_storyTTL = new ScrollScene({triggerElement: "#story", triggerHook : 0.9, reverse:false}).setTween(tween_storyTTL).addTo(controller);
var scene_storyWrap = new ScrollScene({triggerElement: "#storyWrap", triggerHook : 0.7, reverse:false}).setTween(tween_storyWrap).addTo(controller);

var scene_charaTTL = new ScrollScene({triggerElement: "#chara", triggerHook : 0.9, reverse:false}).setTween(tween_charaTTL).addTo(controller);
var scene_charaPapi = new ScrollScene({triggerElement: "#charaPapi", triggerHook : 0.7, reverse:false}).setTween(tween_charaPapi).addTo(controller);
var scene_charaRocoroco = new ScrollScene({triggerElement: "#charaRocoroco", triggerHook : 0.7, reverse:false}).setTween(tween_charaRocoroco).addTo(controller);
 
}

function commonFunc(){

/////////////////////////////////////
//マウスオーバーで画像が光る（スマホ対応）//
/////////////////////////////////////

moCNT=0;

var ua = navigator.userAgent;
if(ua.indexOf('iPhone') > 0 || ua.indexOf('iPod') > 0 ||ua.indexOf('iPad') > 0 || ua.indexOf('Android') > 0) {

$( '.fade, input[type="button"], input[type="submit"], button' )
  .bind( 'touchstart', function(){
    $( this ).addClass( 'SPhover' );
}).bind( 'touchend', function(){
    $( this ).removeClass( 'SPhover' );
});

}else{

 $('.fade').fadeTo(0, 1.0);
 $('.fade').hover(function(){
 if(moCNT==0){$(this).fadeTo(0, 0.2).fadeTo(400, 1.0); moCNT=1;}
 }, function(){
 $(this).fadeTo(150, 1.0); moCNT=0;
 });
 }

/////////////////////////////
//ページ内リンクでアニメーション//
/////////////////////////////

$('a.ctsMove').click(function(){
var speed = 900;
var href= $(this).attr("href");
var target = $(href == "#" || href == "" ? 'html' : href);
var position = target.offset().top;
$("html, body").animate({scrollTop:position}, speed, "easeOutExpo");
resizeCommonFunc();
return false;
});


///////////////////
//pageTopボタン出現//
///////////////////

var topBtn = $('#ptWrap');    
topBtn.hide();

$(window).scroll(function () {
if ($(this).scrollTop() > 100) {
topBtn.fadeIn();
} else {
topBtn.fadeOut();
}
});

}

function resizeYT(){

var w = $(window).innerWidth();
var wtH = w*0.9*9/16;

if(wtH>630){wtH = 630;}
$(".yt").css('height', wtH).dequeue();

$(".yt").delay("1000").queue(function () {
});
  

}


//cookie判定でモーダル制御
function todaysCookie(){

var cmFlag = true;

var cookies = document.cookie.split("; ");
for (i=0; i<cookies.length; i++) {
	str = cookies[i].split("=");if (str[0] == "visit") {break;}
}
var visit = str[1];
var limit = new Date();
var date = limit.getDate();

if(visit == date){
	cmFlag = false;
}else{
	var limit = new Date();
	var date = limit.getDate();
	limit.setTime(limit.getTime() + 24*60*60*1000);//1日
	limit = limit.toGMTString();
	document.cookie ="visit="+date+";expires="+limit+";path=/;";
		
}

if(cmFlag){
//opYT();
opAnime();
}else{
//opYT();
opAnime();
}

}

function opYT(){

$("#loader").fadeOut(0);
$("#loaderWrap").delay(500).fadeOut(3000);
TweenMax.fromTo("#main", 4.0, {opacity:0, scale:2.0} , {opacity:1, scale:1, ease:Power4.easeOut});

setTimeout(function() { opFunc(); }, 3200);

}

function opAnime(){

$("#loader").fadeOut(0);
$("#loaderWrap").delay(500).fadeOut(3000);
TweenMax.fromTo("#main", 4.0, {opacity:0, scale:2.0} , {opacity:1, scale:1, ease:Power4.easeOut});


}
function opFunc(){

$("#trWin").fadeIn(500);
TweenMax.fromTo("#player", 0.8, {opacity:0, scale:0} , {opacity:1, scale:1, ease:Power4.easeOut, onStart:function(){resizeFunc();}});
player.playVideo();
player.mute();

}
function opYTend(){
player.pauseVideo();
TweenMax.fromTo("#player", 0.8, {opacity:1, scale:1} , {opacity:1, scale:1.2, ease:Power4.easeOut, onComplete:function(){player.stopVideo();}});
$("#trWin").delay(0).fadeOut(600);
}

function openWin(){
TweenMax.fromTo(".modal", 1.2, {scale:-1.0} , {scale:1.0, ease:Power4.easeOut});
}
function closeWin(){
TweenMax.fromTo(".modal", 1.2, {scale:1.0} , {scale:1.1, ease:Power4.easeOut});
$(".modaal-container").css('max-width', 1120);
}