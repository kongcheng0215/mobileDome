require("./libs/zepto.min.js")
require("./libs/swiper-3.4.0.min.js");

var IScroll=require("./libs/iscroll-probe.js");
var indexStr=require("./templates/index.string");
var str=require("./templates/str.string")
var str0=require("./templates/str0.string");
var str1=require("./templates/str.string");
var str2=require("./templates/str1.string");
var str3=require("./templates/str3.string");
var str4=require("./templates/str4.string");
var str5=require("./templates/str5.string");
$(function(){
	$("body").prepend(indexStr);
	$("#wrapper").html(str);
  var arr={
    ob0:str0,
    ob1:str1,
    ob2:str2,
    ob3:str3,
    ob4:str4,
    ob5:str5
  };
	funs();
	var indexs=1;
  time=setInterval(countdown,1000);
	var mySwiper=new Swiper(".header .swiper-container",{
		initialSlide:1,
		centeredSlides:true,
		slidesPerView:3,
		onSlideChangeStart:function(){
			var nexNext=mySwiper.activeIndex;
			indexs=nexNext;
			$(".active").removeClass("active");
			$(".header .swiper-slide span")
			.eq(nexNext).addClass('active');

    $("#wrapper").html(arr['ob'+nexNext]);
        //倒计时
        clearInterval(time);
        time=setInterval(countdown,500);
			//重新运行滑动函数
			funs();
		}
	})
    //倒计时
  function countdown(){
        var reg = /^\d{2}$/;
        var now = new Date;
        for(var i=1;i<6;i++){         
          var str=(now.getMonth()+1)+'月'+(now.getDate()+i-1)+"日";
          $(".swiper-slide span").eq(i).html(str);
        }
        var tim=now.getFullYear()+"/"+(now.getMonth()+1)+"/"+(now.getDate()+indexs);
        console.log(tim);
        var ending = new Date (tim);
        if (now >= ending)
        {
            clearInterval(time);
            $(".times .LimitTime").html("00:00:00") ;
            return;
        }
        var disc = ending - now;
        var day = parseInt (disc / 1000 / 60 / 60 / 24);
        var hour = parseInt (disc / 1000 / 60 / 60 % 24);
        // hour = !reg.test(hour) ? "0" + hour : hour;
        var minute = parseInt (disc / 1000 / 60 % 60);
        // minute = !reg.test(minute) ? "0" + minute : minute;
        var second = parseInt (disc / 1000 % 60);
        // second = !reg.test(second) ? "0" + second : second;
        if(indexs>1){
          hour=parseInt(24*(indexs-1))+parseInt(hour);
        }
        $(".times .LimitTime").html(hour + ":" + minute + ":" + second) ;
        console.log("hour"+second);
   }
	//滑动刷新
    function funs(){
    	var myScroll,downTag,
		    downTag = document.querySelector("#downTag"),
		    upTag = document.querySelector("#upTag"),
		    flag = "",
		    ulDom = document.querySelector("#wrapper .list"),
		    maxScrollY=0;
			myScroll = new IScroll('#wrapper', {
              probeType:2,
              startY:-40
		     });
    maxScrollY = myScroll.maxScrollY;
    console.log("max"+maxScrollY);
    myScroll.on('scroll',function() {
   	console.log(this.y+'='+this.maxScrollY);
    //console.log(this.directionY)

        if (this.y > 5 && !flag && this.directionY==-1) {//当
           downTag.innerHTML="释放刷新！";
           flag="down";
        }else if(this.y<-5 && this.directionY && flag=="down"){
           downTag.innerHTML="下拉";
           flag="";
        }else if(this.y < maxScrollY-40 && this.directionY==1 &&!flag){
           upTag.innerHTML="释放加载！";
           this.maxScrollY = maxScrollY-40;
           flag="up";
        }else if( this.y > maxScrollY-40 && flag=="up" && this.directionY==-1){
           upTag.innerHTML="上拉";
           this.maxScrollY = maxScrollY;
           flag="";
        }
    });
    myScroll.on('scrollEnd',function() {
        if (!flag&& this.y<4 && this.y > -40) {//当
           this.scrollTo(0,-40,300);
           flag="";
        }else if(flag=="down"){
           downTag.innerHTML="加载中...";
           setTimeout(function(){
           	 fresh();
           },1000)
        }else if(flag=="up"){
          upTag.innerHTML="加载中...";
 		  setTimeout(function(){
           	  getList();
           },1000)
      };
    });
		function fresh(){           
           myScroll.scrollTo(0,-40,300);
           downTag.innerHTML="下拉";
           _refresh();
		}
		var page=6;
        function getList(){
        	var html="";
        	if(page<21){
        		for(var i=page;i<page+5;i++){
        			html+=
        			'<dl>'+
						'<dt>'+
							'<img src="/images/1.jpg" alt="">'+
						'</dt>'+
						'<dd>'+
							'<h3>第一首</h3>'+
							'<p>等下完这场雨</p>'+
							'<div class="listCon">'+
								'<span>歌手：</span>'+
								'<p>后弦</p>'+
							'</div>'+
							'<div class="listCon">'+
								'<span>歌词：</span>'+
								'<p>如果可以，别下完这场雨放慢朝夕，拾与你的点滴</p>'+
							'</div>'+
							'<i></i>'+
							'<i></i>'+
						'</dd>'+
					'</dl>'
        		}
        		page=page+5;
        	}else{
        			page=1;
        		}
           var str = html;
            $(ulDom).append(str);
            upTag.innerHTML="上拉";
            _refresh();
        };
        function _refresh(){
           flag="";
           myScroll.refresh();
           maxScrollY = myScroll.maxScrollY;
        }
        document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
    }
})
