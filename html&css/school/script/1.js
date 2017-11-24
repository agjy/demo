var timer=null;
var timer1=null;
window.onload=function() {
    var oPic = document.getElementById("pic");
    var picLis = oPic.getElementsByTagName("li");
    var picNum = oPic.getElementsByTagName("span");
    var picName=document.getElementById("picname");
    var oNames=["德馨楼","凌波湖","凌波楼","凌峰楼","凌云广场","体育馆"];
	var tabLeft=document.getElementById("tab_left");
	var leftSpan=tabLeft.getElementsByTagName("span");
	var tabRight=document.getElementById("tab_right");
	var rightSpan=tabRight.getElementsByTagName("span");
	var leftTxt=tabLeft.getElementsByTagName("div");
	var rightTxt=tabRight.getElementsByTagName("div");
	var oTime=document.getElementById("showtime");
	var oClock=document.getElementById("clock");
	var ctx=oClock.getContext("2d");
	var width=ctx.canvas.width;
	var height=ctx.canvas.height;
	var r=width/2;
	var rem=width/300;
	var hourNumbers=[3,4,5,6,7,8,9,10,11,12,1,2];
    var i = 0;
    var iNow = 0;

	var oWeixin=document.getElementById("weixin");
	var oWeibo=document.getElementById("weibo");
	var oWeixin1=document.getElementById("weixin1");
	var oWeibo1=document.getElementById("weibo1");
	weixin.onmouseover=function(){
		startMove(this,{opacity:0},function(){
			startMove(weixin1,{width: 200, height: 200,top:-20,left:-220});
		})
	}
	weixin.onmouseout=function(){
		startMove(this,{opacity:100},function(){
			startMove(weixin1,{width: 50, height: 50,top:0,left:0});
		})
	}
	weibo.onmouseover=function(){
		startMove(this,{opacity:0},function(){
			startMove(weibo1,{width: 200, height: 200,top:-20,left:-220});
		})
	}
	weibo.onmouseout=function(){
		startMove(this,{opacity:100},function(){
			startMove(weibo1,{width: 50, height: 50,top:55,left:0});
		})
	}
	//显示图片说明
    picName.innerHTML=oNames[iNow];
	//定义图片轮播计时器
    timer = setInterval(function () {
       iNowAdd();
    },3000);
	//图片轮播鼠标移入移出事件
    for (i = 0; i < picNum.length; i++) {
        picNum[i].index = i;
        picNum[i].onmouseover = function () {
            clearInterval(timer);
            iNow = this.index;			//把鼠标移入的图片序号赋给iNow
            pic(iNow);
        }
        picNum[i].onmouseout = function () {
            timer = setInterval(function () {
                iNowAdd();
            },3000);
        }
    }
	tab(leftSpan,leftTxt);
	tab(rightSpan,rightTxt);
	function tab(oSpan,oTxt){
		for(var i=0;i<oSpan.length-2;i++){
			oSpan[i].index=i;
		oSpan[i].onmouseover=function(){
				for(var j=0;j<oSpan.length-2;j++){
					oSpan[j].className="";
						oTxt[j].style.display="none";
				}
			this.className="in";
			oTxt[this.index].style.display="block";
			}
		}
	}
	//先执行一次showTime，在用计时器调用
	showTime();
    timer1=setInterval(function () {
        showTime();
    },1000);
	//图片轮播的淡入淡出
    function pic(iNow){
		//所有图片隐藏
        for (i = 0; i < picNum.length; i++) {
        picNum[i].className = "";
        startMove(picLis[i],{opacity:0});
        }
		//当前图片显示,iNow为当前传入的图片序号
        startMove(picLis[iNow],{opacity:100});
        picNum[iNow].className = "on";
        picName.innerHTML=oNames[iNow];
    }
	//图片序号自加一，到了图片数量最大值，重置
    function iNowAdd(){
        iNow++;
        if (iNow >= picLis.length) {
            iNow = 0;
        }
        pic(iNow);
    }
	//时间如果是小于10的数补0
    function check(t){
        if(t<10)
            t="0"+t;
        else t=t;
        return t;
    }
	//显示时间函数并且绘制时钟
    function showTime(){
        var Now=new Date();
        var year=Now.getFullYear();
        var month=Now.getMonth()+1;
        var date=Now.getDate();
        var day=Now.getDay();
        switch (day){
            case 0: day="星期天";break;
            case 1: day="星期一";break;
            case 2: day="星期二";break;
            case 3: day="星期三";break;
            case 4: day="星期四";break;
            case 5: day="星期五";break;
            case 6: day="星期六";break;
        }
        var hour=Now.getHours();
        var minute=Now.getMinutes();
        var second=Now.getSeconds();
        hour=check(hour);
        minute=check(minute);
        second=check(second);
        oTime.innerHTML=year+"年"+month+"月"+date+"日"+day+"<br>"+hour+":"+minute+":"+second;
		//绘制时钟
		ctx.clearRect(0,0,width,height);	//清除画布
		drawBackground();					
		drawHour(hour,minute);
		drawMinute(minute);
		drawSecond(second);
		drawDot();		
		ctx.restore();						//返回之前保存过的路径状态和属性
    }
	//绘制时钟背景函数
function drawBackground(){
	ctx.save();								//保存当前环境状态
	ctx.translate(r,r);						//重新定义画布原点
	ctx.beginPath();						//起始一条路径，或重置当前路径
	ctx.lineWidth=10*rem;					//画笔线宽,rem用于画布变化时的比例
	ctx.arc(0,0,r-ctx.lineWidth/2,0,2*Math.PI,false);	//创建弧线
	ctx.stroke();							//绘制定义的线条
	//遍历小时数数组
	hourNumbers.forEach(function(number,i){
		var rad=2*Math.PI/12*i;
		var x=Math.cos(rad)*(r-30*rem);
		var y=Math.sin(rad)*(r-30*rem);
		ctx.font=28*rem+"px Arial";
		ctx.textAlign="center";
		ctx.textBaseline="middle";
		ctx.fillText(number,x,y);
	});
	for(var i=0;i<60;i++){
		var rad=2*Math.PI/60*i;
		var x=Math.cos(rad)*(r-15*rem);
		var y=Math.sin(rad)*(r-15*rem);
		ctx.beginPath();
		if(i%5===0){
			ctx.arc(x,y,3*rem,0,2*Math.PI,false);
			ctx.fillStyle="#000";		
		}
		else{
			ctx.fillStyle="#999";
			ctx.arc(x,y,2*rem,0,2*Math.PI,false);
		}
		ctx.fill();
	}	
}
// 绘制时针
function drawHour(hour,minute){
	ctx.save();
	ctx.beginPath();
	var rad=2*Math.PI/12*hour;
	var mrad=2*Math.PI/12/60*minute;
	ctx.rotate(rad+mrad);
	ctx.lineWidth=10*rem;
	ctx.lineCap="round";
	ctx.moveTo(0,15*rem);
	ctx.lineTo(0,-r/2);
	ctx.stroke();
	ctx.restore();
}
//绘制分针
function drawMinute(minute){
	ctx.save();
	ctx.beginPath();
	var rad=2*Math.PI/60*minute;
	ctx.rotate(rad);
	ctx.lineWidth=5*rem;
	ctx.lineCap="round";
	ctx.moveTo(0,10*rem);
	ctx.lineTo(0,-r+30*rem);
	ctx.stroke();
	ctx.restore();
}
//绘制秒针
function drawSecond(second){
	ctx.save();
	ctx.beginPath();
	ctx.fillStyle="#ff2513";
	var rad=2*Math.PI/60*second;
	ctx.rotate(rad);
	ctx.moveTo(-2*rem,20*rem);
	ctx.lineTo(2*rem,20*rem);
	ctx.lineTo(1,-r+18*rem);
	ctx.lineTo(-1,-r+18*rem);
	ctx.fill();
	ctx.restore();
}
//绘制时钟圆点
function drawDot(){
	ctx.beginPath();
	ctx.fillStyle="#fff";
	ctx.arc(0,0,3,0,2*Math.PI,false);
	ctx.fill();
}	
}







