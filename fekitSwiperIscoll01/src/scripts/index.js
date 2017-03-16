var str1=require("./templates/index.string");
var str2=require("./templates/main.string");
var IScroll=require("./libs/iscroll-probe.js");

require("./libs/zepto.min.js");
require("./libs/swiper-3.4.0.min.js");
$(function(){
	$("body").prepend(str1);
	var myswiper = new Swiper('.swiper-container');
	document.querySelector("#slide4").onclick=function(){
		$('body').html(str2);
		setTimeout(function(){
			var myScroll=new IScroll("#main-scroll",{
				mouseWheel:true,
				hScrollbar:false,
				vScrollbar:false
			})
		},1000)
	}
})